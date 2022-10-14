import '../App.css';
import {Link} from "react-router-dom";

function HelloWorld(){
    return(
        <div className="App">
            <header className="App-header">
                <p>
                    Выберете интересующий вас диалог:
                </p>
                <Link to = "/dialog_1">
                    Танки
                </Link>
                <Link to = "/dialog_2">
                    Самолёты
                </Link>
                <Link to = "/dialog_3">
                    Вертолёты
                </Link>
                <Link to = "/dialog_4">
                    Корабли
                </Link>
                <Link to = "/dialog_5">
                    Машины
                </Link>
            </header>
        </div>
    );
}
export default HelloWorld;