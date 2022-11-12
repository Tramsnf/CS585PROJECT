import React, { useState, useEffect } from 'react'
import LeftMenu from './LeftMenu';
import RightMenu from './RightMenu';

export default function NavBar(props) {

    const [nav, setNav] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
    });

    const handleScroll = () => {
        window.pageYOffset > props.length ? !nav && setNav(true) : nav && setNav(false)
    }

    var styles = {
    nav : {
        transition: "all 0.1s linear",
        position: "fixed",
        zIndex: "2000",
        padding: "8px",
        background:"#FFF",
        width: "100%",
    },
    scrollNav : {
        transition: "all 0.5s ease-in",
        zIndex: "2000",
        background: "#ffffff",
        borderBottom: "1px solid #dddddd"
    },
    styl : {
        paddingTop: "80px"
    }
    }

        
    return (
    <div>
        <div style={nav? {...styles.nav, ...styles.scrollNav} : {...styles.nav}}>
            <div className="flex" style={{justifyContent: "space-between"}}>
                    <div><LeftMenu /></div>
                    <div><RightMenu /></div>
            </div>
        </div>
    </div>
    
    )
}
