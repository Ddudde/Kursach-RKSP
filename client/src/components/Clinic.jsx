import {Component} from "react";
import button from './button.module.css';
import clin from './clin.module.css';
import {Link} from "react-router-dom";

let rot = document.getElementById('root');

export default class Clinic extends Component
{
    componentDidMount() {
        console.log('I was triggered during componentDidMount');
        rot.className = clin.rot;
    }

    componentWillUnmount() {
        console.log('I was triggered during componentWillUnmount');
        rot.className = 'rot';
    }

    render() {
        console.log('I was triggered during render');
        return(
            <div className={clin.App} style={}>
                <header className={clin.header}>
                    <Link to = "/">
                        <center><div className={[button.button, clin.button].join(' ')}>Искренне принять поздравление</div></center>
                    </Link>
                </header>
            </div>
        );
    }
}