# Viviani4D Web Implementation

Interactive WebGL viewer for four-dimensional NURBS surfaces.

## Run locally

```sh
python -m http.server 8080 --directory dist
```

Then open <http://localhost:8080>.

## GitHub Pages

Pushing `main` deploys the contents of `dist/` with GitHub Actions. Configure the repository's Pages source as **GitHub Actions** if it is not selected automatically.

Expected URL: <https://dearsip.github.io/viviani-4d-web/>

## Custom data

Load a JSON file containing `degreeU`, `degreeV`, `knotsU`, `knotsV`, `controlPoints[u][v][x,y,z,w]`, and `weights[u][v]`.
