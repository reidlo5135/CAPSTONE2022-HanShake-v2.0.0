import logo from '../../asset/handshake_logo.png'
import { Link } from "react-router-dom";
import './main.css';

export default function Main() {
    return (
        <>
        <div className="Main">
            <div className="Main-Content">
                <div style={{marginTop : "150px", textAlign : "center"}}>
                    <img src={logo}/><br/>
                    <span className="subtext">수어로만나는대림대학교</span> <br/>
                    <div>
                        <Link to="/select">
                            <button className="btn-start">시작하기</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}