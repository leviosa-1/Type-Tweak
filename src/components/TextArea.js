import React,{useState} from 'react'


export default function TextArea(props) {
    const handleUpClick = () =>{
        let newText = Text.toUpperCase();
        setText(newText);
        props.showAlert("converted to upper case!","success");

    }
    const handleLowClick = () =>{
        let newText = Text.toLowerCase();
        setText(newText);
        props.showAlert("converted to Lower case!","success");

    }
    const handleClearClick = () =>{
        let newText = ''
        setText(newText);

    }
    const handleCopyClick = () =>{
        let text = document.getElementById("my-box")
        text.select();
        navigator.clipboard.writeText(text.value);    
        props.showAlert("copied to clipboard","success");
     }
    const onchange = (event) =>{
        setText(event.target.value);
    }
    const handleExtraSpace =() =>{
        let newText = Text.split(/[ ]+/);
        setText(newText.join(" "));
        props.showAlert("removed extra spacess !","success");
    }
    const [Text,setText] = useState("");
  return (
    <>
    <div className="mb-3" style={{color: props.mode==='dark'?'white':'black'}}>
              <h2>{props.heading}</h2>
              <textarea className="form-control" value={Text}  onChange={onchange} id="my-box" rows="8" style={{backgroundColor: props.mode==='dark'?'grey':'white', 
                color: props.mode==='dark'?'white':'black'
              }}></textarea>
              <button disabled={Text.length===0} type="button" className="btn btn-primary mx-1 my-1" onClick={handleUpClick}>convert to uppercase</button>
              <button disabled={Text.length===0} type="button" className="btn btn-primary mx-1 my-1" onClick={handleLowClick}>convert to Lowercase</button>
              <button disabled={Text.length===0} type="button" className="btn btn-primary mx-1 my-1" id="my-box" onClick={handleCopyClick}>Copy text</button>
              <button disabled={Text.length===0} type="button" className="btn btn-primary mx-1 my-1" onClick={handleExtraSpace}>Remove extra spaces</button>
              <button disabled={Text.length===0}  type="button" className="btn btn-danger mx-1 my-1" onClick={handleClearClick}>clear text</button>
    </div>
    
    <div className="my-3"style={{color: props.mode==='dark'?'white':'black'}}>
        <h2>Your text Summary</h2>
        <p>{Text.split(/\s+/).filter((element)=>{return element.length!==0}).length} Words and {Text.length} characters</p>
        <p>You need {0.008 *Text.split(" ").length } minutes to read</p>
        <h3>Preview</h3>
        <p>
            {Text}
        </p>

    </div>
    </>
  )
}
