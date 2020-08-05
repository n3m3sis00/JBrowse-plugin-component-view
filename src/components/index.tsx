// basic custom "view" component that renders a h1 and a button with react hook
// to update state
export default function (pluginManager: any) {
  const React = pluginManager.lib["react"];

  return function () {
    const [pushed, setPushed] = React.useState();
    return (
      <div style={{ padding: 50 }}>
        <h1>Hello bioinformaticians!</h1>
        <button
          onClick={() => {
            setPushed("heck ya, ya pushed the button");
          }}
        >
          Push the button
        </button>
        <p>{pushed}</p>
      </div>
    );
  };
}

