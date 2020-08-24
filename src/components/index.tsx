/*
Author: Shreya Srivastava, Colin Diesh
*/

/*TODO
    Species name on leaf Node rathar Than accession Number : https://rest.ensembl.org/cafe/genetree/id/${geneId}?content-type=text/x-nh;nh_format=simple
    Huge Tree Sometimes Crashes browser (Fixes: MSA render breaks on huge trees so don't show it, no color coding of MSA might work)
*/

import React, { useState, useEffect } from "react";
import { Tree, MSA } from "phylo-react";
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles(theme => ({
  tree_div: {
    display: 'flex',
    flexDirection: 'row',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
    width: 'calc(100vw - 32px)',
  },
}))

var globalseq = ""
function ensemblToStock(currentNode) {
    var i, currentChild;
    for (i = 0; i < 2; i += 1) {
        if(currentNode.children){
            currentChild = currentNode.children[i];
            ensemblToStock(currentChild);
        }else{
            globalseq += currentNode.sequence.id[0].accession + " " + currentNode.sequence.mol_seq.seq + "\n";
            return;
        }

    }
}

function TreeMSA(props){
  const {treedata, msadata, layout} = props
  const [treeresponse, setTreeresponse] = useState(null)
  const classes = useStyles()

  return (
      <Grid key={1} item>
        <div className={classes.tree_div}>
          <Box width="50%">
            <Tree 
              data = {treedata}
              layout = {layout}
              getConfig={treeresponse === null ? setTreeresponse : d => {}}/>
          </Box>
          <Box width="50%" style={{ overflowX: 'scroll' }}>
          {treeresponse !== null ? <MSA data={msadata} heigtoftree={treeresponse.treeheight} dataToShow={treeresponse.leafloc}/> : null}
          </Box>
        </div>
      </Grid>
  )
}

function App() {
  const [tree, setTree] = useState();
  const [msadata, setmsadata] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const [showBranchLength, setShowBranchLength] = useState(true);
  const [geneId, setGeneId] = useState("ENSGT00390000003602");
  const [species, setSpecies] = useState(false);
  return (
    <div className="App">
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          setLoading(true);
          const result = await fetch(
                `https://rest.ensembl.org/genetree/id/${geneId}?content-type=text/x-nh;nh_format=simple`
              );

          const resultmsa = await fetch(
                `https://rest.ensembl.org/genetree/id/${geneId}?content-type=application/json;aligned=1;sequence=cdna` //
              );
              
          if (!result.ok && !resultmsa.ok) {
            setError(result.statusText);
            setLoading(false);
            return;
          }
          const text = await result.text();
          const msatext = await resultmsa.json();
          await ensemblToStock(msatext.tree)
          setTree(text);
          setmsadata(globalseq)
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
        <button type="submit">Submit</button>
      </form>
      {loading ? <p>Loading...</p> : null}
      {error ? <p style={{ color: "red" }}>{error}</p> : null}
      {tree ? <TreeMSA treedata={tree} msadata={msadata} showBranchLength={showBranchLength} layout={"linear"}/> : null}
    </div>
  );
}

export default App;