import React, { Component } from 'react';
import { Grid, Row, Col }   from 'react-bootstrap';

import website from "../website.png";
import github from "../github.png";
import twitter from "../twitter.png";
import discord from "../discord.png";
import bitcointalk from "../bitcointalk.png";
import reddit from "../reddit.png";

export default class Footer extends Component {
    render() {
        return (
            <Grid fluid={true} id="footer">
                <br />
                <Row>
                    <Col md={12} className="footerSocialWrap">
                        <ul className="footerSocial">
                            <li>
                                <a href="http://zclassic.org/">
                                    <img src={website} alt="website"/>
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/z-classic/zclassic">
                                    <img src={github} alt="github"/>
                                </a>
                            </li>
                            <li>
                                <a href="https://twitter.com/ZclassicCoin">
                                    <img src={twitter} alt="twitter"/>
                                </a>
                            </li>
                            <li>
                                <a href="https://discord.gg/PmVX5jW">
                                    <img src={discord} alt="discord"/>
                                </a>
                            </li>
                            <li>
                                <a href="https://bitcointalk.org/index.php?topic=1671982.msg16789011#msg16789011">
                                    <img src={bitcointalk} alt="bitcointalk"/>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.reddit.com/r/ZClassicOfficial/">
                                    <img src={reddit} alt="reddit"/>
                                </a>
                            </li>
                        </ul>
                    </Col>
                    <Col md={12}>
                        <p className="footerCopyright">
                            Send me a memo zcH8yxWM5HHkrLKrt9HeTxWYPUqv1kzLYtX44BmkFSvWaixmfibB4U64P81RpDUUtGYuWRW1TPDb4uiB9nPtMfBrBcPv4w7
                        </p>
                    </Col>
                </Row>
            </Grid>
        );
    }
}
