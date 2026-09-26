# Viviani4D Web Implementation

Interactive WebGL viewer for four-dimensional NURBS surfaces.

## Features

- Exact evaluation of four-dimensional NURBS surfaces
- Orthographic and perspective projection from 4D to 3D
- Interactive rotation in visible space and through the fourth dimension
- Side-by-side and cross-eyed stereoscopic views with adjustable eye spacing
- Adjustable tessellation, wireframe, and control-net display
- JSON import and export
- Viviani surface, Clifford torus, and 4D spline ribbon presets

## Controls

- **Left drag:** rotate in 3D (XZ / YZ planes)
- **Right drag or two-finger drag:** rotate through the fourth dimension
- **Mouse wheel or Zoom slider:** zoom the view
- **Stereoscopic view:** select side-by-side or cross-eyed viewing
- **Eye spacing:** adjust stereo separation independently of zoom
- **Reset view:** restore the initial rotation and zoom
- **Copy view URL:** copy a link containing the current preset, projection, stereo mode, and eye spacing

Custom surfaces can be loaded as JSON containing `degreeU`, `degreeV`, `knotsU`, `knotsV`, `controlPoints[u][v][x,y,z,w]`, and `weights[u][v]`.

## References

- [Viviani4D paper](https://doi.org/10.1016/j.softx.2026.102720)
- [Viviani4D data on Zenodo](https://zenodo.org/records/15514237)
- [Viviani4D reference implementation](https://github.com/robertipanaque/viviani4d)
- [CRF Polychoron Viewer](https://github.com/dearsip/CRF-Polychoron-Viewer)
