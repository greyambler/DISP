import React from 'react';
import { render } from 'react-dom';
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

//import './MyComponent.css';

export default class Onle_Need_2 extends React.Component {

    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div>
                <Link activeClass="active" className="test1" to="test1" spy={true} smooth={true} duration={500} >Test 1</Link>
                <Link activeClass="active" className="test2" to="test2" spy={true} smooth={true} duration={500}>Test 2</Link>
                <Link activeClass="active" className="test3" to="test3" spy={true} smooth={true} duration={500} >Test 3</Link>
                <Link activeClass="active" className="test4" to="test4" spy={true} smooth={true} duration={500}>Test 4</Link>
                <Link activeClass="active" className="test5" to="test5" spy={true} smooth={true} duration={500} delay={1000}>Test 5 ( delay )</Link>


                <br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/>
                <Element name="test1" className="element" >                    test 1        </Element>
                <br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/>
                <Element name="test2" className="element">                    test 2        </Element>
                <br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/>
                <Element name="test3" className="element">                    test 3        </Element>
                <br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/>
                <Element name="test4" className="element">                    test 4        </Element>
                <br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/><br/><hr/>
                <Element name="test5" className="element">                    test 5        </Element>
            </div>
        );
    }
};

//render(<Section />, document.getElementById('root'));