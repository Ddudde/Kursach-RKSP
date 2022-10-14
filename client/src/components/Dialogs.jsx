import button from './button.module.css';
import {Link} from "react-router-dom";

function Dialogs(props){
    return(
        <div className="App">
            <header>
                <p>Вы можете что-то сказать про {props.name}</p>
                {/*<img alt="" id='iup' src={up} onClick={() => def.uuup()}/>*/}
                <Link to = "/cong">
                    <div className={button.button}>Да</div>
                </Link>
                <Link to = "/">
                    <div className={button.button}>Нет</div>
                </Link>
            </header>
        </div>
    );
}
export default Dialogs;