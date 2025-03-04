import { Component } from "react";

type ComponentClassProps = {
    title: string;
}

type ComponentClassStates = {
    count: number;
}

export class ComponentClass extends Component<ComponentClassProps, ComponentClassStates> {
    constructor(props: ComponentClassProps){
        super(props);
        this.state = {
            count: 0,
        };
    }

    incrementar() {
        this.setState((prevState) => ({
            count: prevState.count + 1
        }));
    }

    decrementar() {
        this.setState((prevState) => ({ count: prevState.count - 1 }));
    };
    
    render(){
        return(
            <div>
                <h2>{this.props.title || "Contador"}</h2>
                <p>Valor: {this.state.count}</p>
                <button onClick={()=> this.incrementar()}>+1</button>
                <button onClick={()=> this.decrementar()}>-1</button>
            </div>
        );
    }
}