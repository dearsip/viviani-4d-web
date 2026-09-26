const SQ2=Math.SQRT1_2;

function circle9(radius=1) {
  const p=[[1,0],[1,1],[0,1],[-1,1],[-1,0],[-1,-1],[0,-1],[1,-1],[1,0]].map(([x,y])=>[x*radius,y*radius]);
  return {p,w:[1,SQ2,1,SQ2,1,SQ2,1,SQ2,1],k:[0,0,0,1,1,2,2,3,3,4,4,4],d:2};
}

export function viviani(a=1) {
  const c=[[2,0,0],[2,1,1],[1,1.5,1.5],[0,1,2],[0,0,2],[0,-1,2],[1,-1.5,1.5],[2,-1,1],[2,0,0],[2,1,-1],[1,1.5,-1.5],[0,1,-2],[0,0,-2],[0,-1,-2],[1,-1.5,-1.5],[2,-1,-1],[2,0,0]].map(p=>p.map(v=>v*a));
  const cw=[1,1,4/3,2,4,2,4/3,1,1,1,4/3,2,4,2,4/3,1,1];
  const cp=[[1,0],[1,Math.sqrt(3)],[-.5,Math.sqrt(3)/2],[-2,0],[-.5,-Math.sqrt(3)/2],[1,-Math.sqrt(3)],[1,0]];
  const pw=[1,.5,1,.5,1,.5,1];
  return {name:'Viviani surface',description:'球面と円柱面の交差から得られる4次元Viviani曲面。論文の厳密なテンソル積NURBS表現です。',degreeU:4,degreeV:2,knotsU:[0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,4],knotsV:[0,0,0,1,1,2,2,3,3,3],controlPoints:c.map(([x,r,w])=>cp.map(([cy,cz])=>[x,cy*r,cz*r,w])),weights:cw.map(x=>pw.map(y=>x*y))};
}

export function clifford() {
  const a=circle9(1),b=circle9(1);
  return {name:'Clifford torus',description:'互いに直交する2つの平面の円を直積した、R⁴のCliffordトーラス。2次有理曲線のテンソル積です。',degreeU:2,degreeV:2,knotsU:a.k,knotsV:b.k,controlPoints:a.p.map(([x,y])=>b.p.map(([z,w])=>[x,y,z,w])),weights:a.w.map(x=>b.w.map(y=>x*y))};
}

export function ribbon() {
  const u=7,v=4,cp=[],wt=[];
  for(let i=0;i<u;i++){const row=[],wr=[];for(let j=0;j<v;j++){const x=(i-3)*.65,y=(j-1.5)*.5;row.push([x,y,.55*Math.sin(i*.9+j*.7),.7*Math.cos(i*.75-j*.8)]);wr.push(1);}cp.push(row);wt.push(wr)}
  return {name:'4D spline ribbon',description:'4次元にうねる非有理B-spline曲面。W方向の変位が投影像をどう変えるか観察できます。',degreeU:3,degreeV:3,knotsU:[0,0,0,0,1,2,3,4,4,4,4],knotsV:[0,0,0,0,1,1,1,1],controlPoints:cp,weights:wt};
}

export const presets={viviani,clifford,ribbon};
