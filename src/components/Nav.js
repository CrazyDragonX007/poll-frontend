import Navbar from 'react-bootstrap/Navbar';
import img from './logo.jpg';

function Nav() {
    return (
        <>
            <Navbar>
                <img
                    alt=""
                    src={img}
                    width="50"
                    height="50"
                />
                <p className="m-4">IGN Poll Demo</p>
            </Navbar>
        </>
    );
}

export default Nav;