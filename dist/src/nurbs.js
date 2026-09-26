export function basisAll(degree, knots, u, count) {
  const N = new Float64Array(count);
  const end = knots[knots.length - degree - 1];
  if (Math.abs(u - end) < 1e-10) { N[count - 1] = 1; return N; }
  for (let i = 0; i < count; i++) N[i] = knots[i] <= u && u < knots[i + 1] ? 1 : 0;
  for (let p = 1; p <= degree; p++) {
    const prev = N.slice();
    for (let i = 0; i < count; i++) {
      const aDen = knots[i + p] - knots[i];
      const bDen = knots[i + p + 1] - knots[i + 1];
      const a = aDen ? (u - knots[i]) / aDen * prev[i] : 0;
      const b = bDen && i + 1 < count ? (knots[i + p + 1] - u) / bDen * prev[i + 1] : 0;
      N[i] = a + b;
    }
  }
  return N;
}

export function validateSurface(s) {
  const required = ['degreeU','degreeV','knotsU','knotsV','controlPoints','weights'];
  for (const k of required) if (s[k] == null) throw new Error(`必須フィールド ${k} がありません`);
  const nu = s.controlPoints.length, nv = s.controlPoints[0]?.length;
  if (!nu || !nv) throw new Error('controlPoints が空です');
  if (s.knotsU.length !== nu + s.degreeU + 1 || s.knotsV.length !== nv + s.degreeV + 1) throw new Error('ノット列の長さが次数・制御点数と一致しません');
  if (s.weights.length !== nu || s.weights.some(r => r.length !== nv)) throw new Error('weights の形状が制御点網と一致しません');
  if (s.controlPoints.some(r => r.length !== nv || r.some(p => p.length !== 4 || p.some(v => !Number.isFinite(v))))) throw new Error('制御点は [x,y,z,w] の2次元配列で指定してください');
  return s;
}

export function sampleSurface(surface, uSteps, vSteps) {
  validateSurface(surface);
  const nu = surface.controlPoints.length, nv = surface.controlPoints[0].length;
  const u0 = surface.knotsU[surface.degreeU], u1 = surface.knotsU[nu];
  const v0 = surface.knotsV[surface.degreeV], v1 = surface.knotsV[nv];
  const points = new Float32Array(uSteps * vSteps * 4);
  const uv = new Float32Array(uSteps * vSteps * 2);
  for (let a = 0; a < uSteps; a++) {
    const u = u0 + (u1-u0) * a / (uSteps-1), bu = basisAll(surface.degreeU, surface.knotsU, u, nu);
    for (let b = 0; b < vSteps; b++) {
      const v = v0 + (v1-v0) * b / (vSteps-1), bv = basisAll(surface.degreeV, surface.knotsV, v, nv);
      const sum = [0,0,0,0]; let den = 0;
      for (let i=0;i<nu;i++) for(let j=0;j<nv;j++) {
        const q = bu[i]*bv[j]*surface.weights[i][j]; if (!q) continue;
        den += q; const p=surface.controlPoints[i][j];
        sum[0]+=q*p[0]; sum[1]+=q*p[1]; sum[2]+=q*p[2]; sum[3]+=q*p[3];
      }
      if (Math.abs(den)<1e-12) throw new Error(`NURBS分母が0です (u=${u}, v=${v})`);
      const k=(a*vSteps+b)*4, t=(a*vSteps+b)*2;
      points[k]=sum[0]/den; points[k+1]=sum[1]/den; points[k+2]=sum[2]/den; points[k+3]=sum[3]/den;
      uv[t]=a/(uSteps-1); uv[t+1]=b/(vSteps-1);
    }
  }
  const indices=[];
  for(let i=0;i<uSteps-1;i++) for(let j=0;j<vSteps-1;j++) { const a=i*vSteps+j,b=a+vSteps,c=b+1,d=a+1; indices.push(a,b,d,b,c,d); }
  return {points,uv,indices:uSteps*vSteps>65535?new Uint32Array(indices):new Uint16Array(indices)};
}
