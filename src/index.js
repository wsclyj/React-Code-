import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

class TextBlock extends React.Component{	
	constructor(props) {
	    super(props);
	}
	
	
	render(){
		return(
			<p className="textblock"
				onClick={()=>{this.props.onClick();}}> {this.props.value} </p>
		);
	}
}

class ListBoxLeft extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		var blocks=[];
		for(let i=0;i<this.props.leftsum;i++){
			blocks.push(<TextBlock value={this.props.value[i]} 
				onClick={()=>{this.props.click(i)}} />);
		}
		return(
			<div id="listboxleft">
			{blocks}
			</div>
		);
	}
}

class ArrowLeft extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<div id="arrowleft" onClick={()=>{this.props.arrowclick();}}>
			<p>&lt;&lt;</p>
			</div>
		);
	}
}

class ListBoxRight extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		var blocks=[];
		for(let i=0;i<this.props.rightsum;i++){
			blocks.push(<TextBlock value={this.props.value[i]}
				onClick={()=>{this.props.click(i)}} />);
		}
		return(
			<div id="listboxright">
			{blocks}
			</div>
		);
	}
}

class ArrowRight extends React.Component{
	constructor(props){
		super(props);
		
	}
	render(){
		return(
			<div id="arrowright" onClick={()=>{this.props.arrowclick();}}>
			<p>&gt;&gt;</p>
			</div>
		);
	}
}

class Button extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<button id="ok"  type="button" onClick={()=>{this.props.okClick()}}>
			OK
			</button>
		);
	}
}

class Textarea extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<textarea id="textarea" disabled></textarea>
		);
	}
}

class MyApp extends React.Component{
	constructor(props) {
	    super(props);
		this.state={
			leftletters:['A','B','C','D','E','F'],
			rightletters:[],
			leftsum:6,
			leftclicked:null,
			clickedpos:null,
			showntext:null,
			clickednum:0,
			clicking:false,
		};
	}
	
	startclick(pos,leftclicked){
		if(!this.state.clicking&&this.state.clickednum==0){
			this.setState({
				clicking:true,
				clickednum:this.state.clickednum+1,
			});
			setTimeout(()=>{this.chooseclickfunc(pos,leftclicked);},300);
		}
		else if(this.state.clicking) {
			this.setState({
				clickednum:this.state.clickednum+1,
			});
		}
	}
	
	chooseclickfunc(pos,leftclicked){
		if(this.state.clickednum>=2){
			var x=document.getElementsByClassName("clickedblock");
			for(let i=0;i<x.length;i++){
				x[i].className="textblock";
			}
			this.clickmove(pos,leftclicked);
		}
		else if(this.state.clickednum==1){
			this.letterclick(pos,leftclicked);
			}
		this.setState({
			clickednum:0,
			clicking:false,
		});
	}
	
	letterclick(pos,leftclicked){
		if(leftclicked===this.state.leftclicked&&this.state.clickedpos==pos){
			var x=document.getElementsByClassName("clickedblock");
			for(let i=0;i<x.length;i++){
				x[i].className="textblock";
			}
			this.setState({
				clickedpos:null,
				leftclicked:null,
				clickednum:0,
			});
		}
		else{
			var x=document.getElementsByClassName("clickedblock");
			for(let i=0;i<x.length;i++){
				x[i].className="textblock";
			}
			if(leftclicked){x=document.getElementById("listboxleft").getElementsByClassName("textblock");}
			else{x=document.getElementById("listboxright").getElementsByClassName("textblock");}
			x[pos].className="clickedblock";			
			this.setState({
				leftclicked:leftclicked,
				clickedpos:pos,
				clickednum:0,
		});
		}
		
	}
	
	arrowclick(leftclicked){
		if((!leftclicked)==this.state.leftclicked){
			this.clickmove(this.state.clickedpos,!leftclicked);
			var x=document.getElementsByClassName("clickedblock");
			for(let i=0;i<x.length;i++){
				x[i].className="textblock";
			}
			this.setState({
				leftclicked:null,
				clickedpos:null,
			});
		}
	}
	
	clickmove(pos,leftclicked){
		if(!leftclicked){
			this.state.leftletters[this.state.leftsum]=this.state.rightletters[pos];
			for(let i=pos;i<this.state.rightletters.length;i++){
				this.state.rightletters[i]=this.state.rightletters[i+1];
			}
			this.setState({
				leftsum:this.state.leftsum+1,
			});
		}
		else{
			this.state.rightletters[6-this.state.leftsum]=this.state.leftletters[pos];
			for(let i=pos;i<this.state.leftletters.length;i++){
				this.state.leftletters[i]=this.state.leftletters[i+1];
			}
			this.setState({
				leftsum:this.state.leftsum-1,
			});
		}
	}
	
	okclick(){
		var text="";
		for(let i=0;i<6-this.state.leftsum;i++){
			text+=this.state.rightletters[i];
		}
		document.getElementById("textarea").innerText=text;
	}
	
	render(){
		return(
			<div id="box">
			<ListBoxLeft value={this.state.leftletters}
				leftsum={this.state.leftsum}
				click={(pos)=>{this.startclick(pos,true)}} />
				
			<ArrowLeft arrowclick={()=>{this.arrowclick(true)}} />
			
			<ListBoxRight value={this.state.rightletters}
				rightsum={6-this.state.leftsum}
				click={(pos)=>{this.startclick(pos,false)}} />
				
			<ArrowRight arrowclick={()=>{this.arrowclick(false)}} />
			
			<Button okClick={()=>{this.okclick()}} />
			<Textarea value={this.state.showntext} />
			</div>
		);
	}
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MyApp />);

reportWebVitals();
