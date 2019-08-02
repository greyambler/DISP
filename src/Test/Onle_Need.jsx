import React from 'react';
import { render } from 'react-dom';
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

//import './MyComponent.css';

export default class Onle_Need extends React.Component {

    constructor(props) {
        super(props);
        //this.scrollToTop = this.scrollToTop.bind(this);
    }
    /*
        componentDidMount() {
    
            Events.scrollEvent.register('begin', function () {
                console.log("begin", arguments);
            });
    
            Events.scrollEvent.register('end', function () {
                console.log("end", arguments);
            });
    
        }
        scrollToTop() {
            scroll.scrollToTop();
        }
        scrollTo() {
            scroller.scrollTo('scroll-to-element', {
                duration: 800,
                delay: 0,
                smooth: 'easeInOutQuart'
            })
        }
        scrollToWithContainer() {
    
            let goToContainer = new Promise((resolve, reject) => {
    
                Events.scrollEvent.register('end', () => {
                    resolve();
                    Events.scrollEvent.remove('end');
                });
    
                scroller.scrollTo('scroll-container', {
                    duration: 800,
                    delay: 0,
                    smooth: 'easeInOutQuart'
                });
    
            });
    
            goToContainer.then(() =>
                scroller.scrollTo('scroll-container-second-element', {
                    duration: 800,
                    delay: 0,
                    smooth: 'easeInOutQuart',
                    containerId: 'scroll-container'
                }));
        }
        componentWillUnmount() {
            Events.scrollEvent.remove('begin');
            Events.scrollEvent.remove('end');
        }
        */

    render() {
        return (
            <div>
                <Link activeClass="active" to="e1" spy={true} smooth={true} duration={250} containerId="containerElement" style={{ display: 'inline-block', margin: '20px' }}>
                    Перейти к Э1        </Link>

                <Link activeClass="active" to="e2" spy={true} smooth={true} duration={250} containerId="containerElement" style={{ display: 'inline-block', margin: '20px' }}>
                    Перейти к Э2       </Link>
                <Link activeClass="active" to="e3" spy={true} smooth={true} duration={250} containerId="containerElement" style={{ display: 'inline-block', margin: '20px' }}>
                    Перейти к Э3       </Link>
                <Link activeClass="active" to="e4" spy={true} smooth={true} duration={250} containerId="containerElement" style={{ display: 'inline-block', margin: '20px' }}>
                    Перейти к Э4       </Link>

                <Element name="test7" className="element" id="containerElement" style={{
                    position: 'relative',
                    height: '200px',
                    overflow: 'scroll',
                    marginBottom: '100px'
                }}>

                    <Element name="e1" style={{
                        marginBottom: '200px'
                    }}>                        Э1          </Element>

                    <Element name="e2" style={{
                        marginBottom: '200px'
                    }}>                        Э2          </Element>
                    <Element name="e3" style={{
                        marginBottom: '200px'
                    }}>                        Э3          </Element>
                    <Element name="e4" style={{
                        marginBottom: '200px'
                    }}>                        Э4          </Element>
                </Element>
            </div>
        );
    }
};

//render(<Section />, document.getElementById('root'));