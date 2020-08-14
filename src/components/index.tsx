import React, { useState } from "react";
import { Tree } from "phylo-react";

function App() {
  const [tree, setTree] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const [showBranchLength, setShowBranchLength] = useState(true);
  const [geneId, setGeneId] = useState("ENSGT00390000003602");
  const [species, setSpecies] = useState(true);
  return (
    <div className="App">
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          setLoading(true);
          const result = await (species
            ? fetch(
                `https://rest.ensembl.org/cafe/genetree/id/${geneId}?content-type=text/x-nh;nh_format=simple`
              )
            : fetch(
                `https://rest.ensembl.org/genetree/id/${geneId}?content-type=text/x-nh;nh_format=simple`
              ));
          if (!result.ok) {
            setError(result.statusText);
            setLoading(false);
            return;
          }
          const text = await result.text();
          setTree(text);
          setError(undefined);
          setLoading(false);
        }}
      >
        <label>
          Enter Ensembl gene ID
          <input
            id="geneid"
            value={geneId}
            onChange={(event) => setGeneId(event.target.value)}
            type="text"
          />
        </label>
        <label>
          Show branch length
          <input
            type="checkbox"
            checked={showBranchLength}
            onChange={(event) => {
              setShowBranchLength(event.target.checked);
            }}
          />
        </label>
        <label>
          Species (CAFE) tree or gene tree?
          <input
            type="checkbox"
            checked={species}
            onChange={(event) => {
              setSpecies(event.target.checked);
            }}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {loading ? <p>Loading...</p> : null}
      {error ? <p style={{ color: "red" }}>{error}</p> : null}
      {tree ? <Tree data={tree} showBranchLength={showBranchLength} /> : null}
    </div>
  );
}

export default App;
