# Viviani 4D NURBS Viewer

WebGL viewer for tensor-product NURBS surfaces embedded in R⁴. The default model is the exact degree-(4,2) NURBS representation of the four-dimensional Viviani surface described in the Viviani4D paper.

Open `dist/index.html` through a local HTTP server. Custom surfaces can be loaded as JSON with `degreeU`, `degreeV`, `knotsU`, `knotsV`, `controlPoints[u][v][4]`, and `weights[u][v]`.

## Controls

- Left drag: rotation within the visible XYZ subspace
- Right drag: rotation through the fourth dimension
- Wheel: zoom

## References

- [Viviani4D paper](https://doi.org/10.1016/j.softx.2026.102720)
- [Reproducible notebook](https://zenodo.org/records/15514237)
- [CRF Polychoron Viewer](https://github.com/dearsip/CRF-Polychoron-Viewer)
