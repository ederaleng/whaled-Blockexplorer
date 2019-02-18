import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal,Button,Row,Col,Container } from 'react-bootstrap'
import wlsjs from 'wlsjs'
import moment from 'moment'
const { Body,Footer } = Modal

wlsjs.api.setOptions({ url: 'https://wls.kennybll.com' });

class Fullwitness extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            show: false,
            witness:this.props.witness,
            ObjWitness: this.props.ObjWitness,
            Historial:null,
            loading:true
        };
        this.handleModal = this.handleModal.bind(this);
        this.LoadingData = this.LoadingData.bind(this)
        this.testingDesing = this.testingDesing.bind(this)
        
    }
    
    LoadingData(status,start,total){
        if(status===true){
            var totalH=total;
            wlsjs.api.getAccountHistory(this.state.witness, start, (start < 0) ? 10000 : Math.min(start, 10000), (err, result)=>{
                if(err){
                    return this.LoadingData(this.state.show,start,total)
                }
                var op=result.reverse()
                var lastrxid
                for(var i = 0; i < op.length; i++){
                    if(op[i][1].op[0]==='producer_reward'){
                        totalH.totalBlockProducer=total.totalBlockProducer+1
                    }
                    if(op[i][1].op[0]==="account_witness_vote"){
                        totalH.totalVotes=op[i][1].op[1].approve===true ? totalH.totalVotes+1 : totalH.totalVotes-1
                    }
                    if(op[i][1].op[0]==="account_witness_proxy"){
                        console.log(op[i][1].op)
                        if(op[i][1].op[1].proxy===this.state.witness){
                            totalH.votosWitnessProxy=totalH.votosWitnessProxy+1;
                        }
                    }
                    if(op[i][1].op[0]==="witness_update"){
                        totalH.totalUpdatedWitness=totalH.witness_update+1;
                    }
                    lastrxid=op[i][0]
                }

                if(op[0][0]>0 && lastrxid!==start){
                    return this.LoadingData(this.state.show,lastrxid,totalH)
                }
                this.setState({ loading:!this.state.loading, Historial:totalH })
            })
        }
    }
    testingDesing(){
        var Historial={  
            totalBlockProducer:25556, 
            totalVotes:230, 
            votosWitnessProxy:1,
            totalUpdatedWitness:6 }
        this.setState({ loading:!this.state.loading, Historial })
    }
    handleModal() {
        this.setState({ show: !this.state.show,loading:true });
        //this.testingDesing()
        
        this.LoadingData(!this.state.show, -1 , 
            {   totalBlockProducer:0, 
                totalUpdatedWitness:0, 
                totalVotes:0 , 
                votosWitnessProxy:0,
            })
    }
    
    render() {
        return (
            <div>
                <Button variant="primary" onClick={this.handleModal}>
                Explorer
                </Button>

                <Modal
                    show={this.state.show}
                    onHide={this.handleModal}
                    dialogClassName="WitnessModalFull"
                    centered={true}
                    size={"sm"}
                >
                <Body>
                    {
                        this.state.loading
                        ?
                        <center>
                            <p>
                            <b>Loading full history of witness {this.props.witness}..</b>
                            </p>
                            <span>This operation may delay much time</span>
                            <br />
                            <img alt="Loading Data Witness" className="witnessDataFullPerfill" src="/icons/loading.svg" />
                        </center>
                        :
                        <div>
                            <Container>
                                <Row>
                                    <Col xl="24" lg="4" xs="24" md="24">
                                        <div className="witnessfullTableP">
                                        <img src={`https://imgp.whaleshares.io/profileimage/${this.state.ObjWitness.owner}/`} style={{ border:"solid 1px #6c757d",height:80,width:80 }} alt={`Full perfil  witness ${this.state.ObjWitness.owner}`} className="rounded-circle" />
                                        </div>
                                    </Col>
                                    <Col xl="24" lg="4" xs="24" md="24">
                                        <div className="tableFullw">

                                        <table className="witnessfullTableP">
                                            <thead>
                                                <tr><td>Witness Creation</td></tr>
                                            </thead>
                                            <tbody>
                                                <tr><td>
                                                {moment(moment.utc(this.state.ObjWitness.created).valueOf()).fromNow() }
                                                </td></tr>
                                            </tbody>
                                        </table>

                                        </div>
                                        
                                    </Col>
                                    <Col xl="24" lg="4" xs="24" md="24">
                                    <div className="tableFullw">
                                        <table className="witnessfullTableP">
                                            <thead>
                                                <tr><td>Votes</td></tr>
                                            </thead>
                                            <tbody>
                                                <tr><td>{`${this.state.Historial.totalVotes} votes`}</td></tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    </Col>
                                </Row>
                                
                                <Row>
                                    <Col xl="24" lg="4" xs="24" md="24">
                                    <div className="tableFullw">
                                        <table className="witnessfullTableP">
                                            <thead>
                                                <tr><td>Votes Proxy</td></tr>
                                            </thead>
                                            <tbody>
                                                <tr><td>{`${this.state.Historial.votosWitnessProxy} votes`}</td></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    </Col>
                                    <Col xl="24" lg="4" xs="24" md="24">
                                    <div className="tableFullw">
                                        <table className="witnessfullTableP">
                                            <thead>
                                                <tr><td>Witness Updates</td></tr>
                                            </thead>
                                            <tbody>
                                                <tr><td>{`${this.state.Historial.totalUpdatedWitness} updates`}</td></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    </Col>
                                    <Col xl="24" lg="4" xs="24" md="24">
                                    <div className="tableFullw">
                                        <table className="witnessfullTableP">
                                            <thead>
                                                <tr><td>Blocks Porducers</td></tr>
                                            </thead>
                                            <tbody>
                                                <tr><td>{`${this.state.Historial.totalBlockProducer} blocks`}</td></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    </Col>
                                </Row>
                                

                                <Row>
                                    <Col xl="24" lg="4" xs="24" md="24">
                                    <div className="tableFullw">
                                        <table className="witnessfullTableP">
                                            <thead>
                                                <tr><td>Block Size</td></tr>
                                            </thead>
                                            <tbody>
                                                <tr><td>{this.state.ObjWitness.props.maximum_block_size}</td></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    </Col>
                                    <Col xl="24" lg="4" xs="24" md="24">
                                    <div className="tableFullw">
                                        <table className="witnessfullTableP">
                                            <thead>
                                                <tr><td>Last block</td></tr>
                                            </thead>
                                            <tbody>
                                                <tr><td>{this.state.ObjWitness.last_confirmed_block_num}</td></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    </Col>
                                    <Col xl="24" lg="4" xs="24" md="24">
                                    <div className="tableFullw">
                                        <table className="witnessfullTableP">
                                            <thead>
                                                <tr><td>Version</td></tr>
                                            </thead>
                                            <tbody>
                                                <tr><td>{this.state.ObjWitness.running_version}</td></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    }
                </Body>
                <Footer>
                    <Button variant="secondary" onClick={this.handleModal}>
                    Close
                    </Button>
                </Footer>
                </Modal>
                
            </div>
        );
    }
}

Fullwitness.propTypes = {
    witness: PropTypes.string.isRequired,
    ObjWitness: PropTypes.object.isRequired
};

export default Fullwitness;