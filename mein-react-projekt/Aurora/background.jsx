import Aurora from './background';

export default function Background() {
  return <Aurora
    colorStops={["#7592bc","#3c427f","#17184b"]}
    blend={0.5}
    amplitude={1.0}
    speed={1}
  />
}
