import React, { Component } from 'react';
import { Row, Col, Button, FormGroup, Radio }
                            from 'react-bootstrap';
import { QRCode }           from 'react-qr-svg';
import zclassicjs           from 'zclassicjs';

class Single extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'T',
            priv: '',
            wif: '',
            addr: ''
        };
    }

    genTAddress() {
        const priv      = zclassicjs.address
            .mkPrivKey(this.props.entropy + new Date().getTime());
        const privWIF   = zclassicjs.address.privKeyToWIF(priv, true);
        const pubKey    = zclassicjs.address.privKeyToPubKey(priv, true);
        const znAddr    = zclassicjs.address.pubKeyToAddr(pubKey);

        this.setState({
            priv: priv,
            wif: privWIF,
            addr: znAddr
        });
    }

    genZAddress() {
        const z_secretKey   = zclassicjs.zaddress
            .mkZSecretKey(this.props.entropy + new Date().getTime());
        const spendingKey   = zclassicjs.zaddress
                                .zSecretKeyToSpendingKey(z_secretKey);
        const a_pk          = zclassicjs.zaddress
                                .zSecretKeyToPayingKey(z_secretKey);
        const pk_enc        = zclassicjs.zaddress
                                .zSecretKeyToTransmissionKey(z_secretKey);
        const Zaddress      = zclassicjs.zaddress.mkZAddress(a_pk, pk_enc);

        this.setState({
            priv: z_secretKey,
            wif: spendingKey,
            addr: Zaddress
        });
    }

    handleCheckRadio(type) {
        this.setState({
            type: type,
            priv: '',
            wif: '',
            addr: ''
        });
    }

    getZpriv() {
        if (this.state.type === 'Z')
            return("Private Key: " + this.state.priv);
    }

    render() {
        return (
          <Col md={12} id="Single">
            <Row className="r1">
                <Col md={4}>
                    <FormGroup>
                        <Radio name="radioGroup"
                        onMouseDown={() => this.handleCheckRadio('T')}
                        checked={this.state.type === 'T'} inline>
                            T Address
                        </Radio>
                        <br />
                        <Radio name="radioGroup"
                        onMouseDown={() => this.handleCheckRadio('Z')}
                        checked={this.state.type === 'Z'} inline>
                            Z Address
                        </Radio>
                    </FormGroup>
                </Col>

                <Col md={2}>
                    <Button onClick={this.state.type === 'T' ?
                        () => this.genTAddress()
                        : () => this.genZAddress()}
                    >
                        Generate New Address
                    </Button>
                </Col>
                <Col md={2}>
                    <Button onClick={window.print}>
                        Print
                    </Button>
                </Col>
            </Row>

                {this.state.addr ? (
                    <Row className="r2">
                        <Col xs={3} className="max-width singleTabs col-xs-offset-3">
                            <h1 style={{color:'green'}}>Public</h1>
                            <h3>ZCL Address</h3>
                            <div>
                                <QRCode
                                    bgColor="#FFFFFF"
                                    fgColor="#000000"
                                    level="L"
                                    value={this.state.addr}
                                />
                            </div>
                            <div className="zentabcode">
                                {this.state.addr}
                            </div>
                        </Col>
                        <Col xs={3} className="max-width singleTabs">
                            <h1 style={{color:'red'}}>Secret</h1>
                            <div>
                                {this.state.type === 'T' ? (
                                    <h3>Private Key</h3>
                                ) : (
                                    <h3>Spending Key</h3>
                                )}
                                <div>
                                    <QRCode
                                        bgColor="#FFFFFF"
                                        fgColor="#000000"
                                        level="L"
                                        value={this.state.wif}
                                    />
                                </div>
                                <div className="zentabcode">{this.state.wif}</div>
                            </div>
                            <div>{this.getZpriv()}</div>
                        </Col>
                    </Row>
                ) : (
                    <Row className="r2 no-padding"></Row>
                )}
                <hr />
                <Row className="r3">
                    <Col>
                        <div>
                          <p>
                            <b>A Zclassic Wallet</b> can be as simple as a single pairing of a Zclassic address with its corresponding Zclassic private key. You can share your address to receive ZCL payments, however your private key is what allows you to unlock, manage, and send your funds - <b>keep it safe</b>.
                        </p>
                        <p>
                            <b>**To safeguard this wallet**</b> you must print or otherwise record the Zclassic address and private key. It is important to make a backup copy of the private key and store it in a safe location. This site does not have knowledge of your private key. If you leave/refresh the site or press the "Generate New Address" button then a new private key will be generated and the previously displayed private key will not be retrievable. Your Zclassic private key should be kept a secret. Whomever you share the private key with has access to spend all the ZCL associated with that address. If you print your wallet then store it in a zip lock bag to keep it safe from water. Treat a paper wallet like cash.
                        </p>
                        <br/>
                        <p>
                            <b>Add funds</b> to this wallet by instructing others to send ZCL to your ZCL address.
                        </p>
                        <p>
                            <b>Check your balance</b> by entering your ZCL address on one of these explorers:
                        </p>
                        <ul style={{listStyleType: 'none'}}>
                            <li><a href="http://zclassicexplorer.com/" target="_blank" rel="noopener noreferrer" style={{textDecoration: 'underline'}}>zclassicexplorer.com</a></li>
                        </ul>
                        <ul style={{listStyleType: 'none'}}>
                            <li><a href="https://zcl-explorer.com/insight/" target="_blank" rel="noopener noreferrer" style={{textDecoration: 'underline'}}>zcl-explorer.com</a></li>
                        </ul>
                        <ul style={{listStyleType: 'none'}}>
                            <li><a href="http://explorer.zclmine.pro/" target="_blank" rel="noopener noreferrer" style={{textDecoration: 'underline'}}>explorer.zclmine.pro</a></li>
                        </ul>
                        <br/>
                        <p>
                            <b>To spend your ZCL,</b> you can download the <a href='https://github.com/ZclassicOfficial/Zclassic-swing-wallet-ui/releases' target="_blank" rel="noopener noreferrer">Zclassic Swing Wallet</a> and import your private key to the p2p client wallet. It is <b>**strongly discouraged**</b> to spend directly from this address without importing the private key into a wallet application, since certain precautions need to be taken so you receive your change!
                          </p>
                        </div>
                    </Col>
                </Row>
            </Col>
        );
    }
}

export default Single;
