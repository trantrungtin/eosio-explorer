import React, { useEffect } from 'react';

import { connect } from 'react-redux';

import { Col, Form, FormGroup, Label } from 'reactstrap';

import { pollingStart, pollingStop } from './HeadblockReducer';

import { LoadingSpinner } from 'components';


const Headblock = (props) => {

  useEffect(()=>{
    props.pollingStart()
    return () => { props.pollingStop() }
  }, [])

  let { headblock: { isFetching, data }} = props;
  
  return (
    <>
      {isFetching ? (
        <LoadingSpinner />
      ) : (
        <Form className="form-horizontal">
          <FormGroup row className="mb-0">
            <Col xs="2">
              <Label><strong>Block Number</strong></Label>
            </Col>
            <Col xs="10">
              <p className="form-control-static">{data.payload.block_num}</p>
            </Col>
          </FormGroup>
          <FormGroup row className="mb-0">
            <Col xs="2">
              <Label><strong>Block ID</strong></Label>
            </Col>
            <Col xs="10">
              <p className="form-control-static">{data.payload.block_id}</p>
            </Col>
          </FormGroup>
          <FormGroup row className="mb-0">
            <Col xs="2">
              <Label><strong>Timestamp</strong></Label>
            </Col>
            <Col xs="10">
              <p className="form-control-static">{data.payload.block && data.payload.block.timestamp}</p>
            </Col>
          </FormGroup>
          <FormGroup row className="mb-0">
            <Col xs="2">
              <Label><strong>Block Producer</strong></Label>
            </Col>
            <Col xs="10">
              <p className="form-control-static">{data.payload.block && data.payload.block.producer}</p>
            </Col>
          </FormGroup>
      </Form>
      )}
    </>
  );
}

export default connect(
  ({ infoPage: { headblock }}) => ({
    headblock
  }),
  {
    pollingStart,
    pollingStop
  }

)(Headblock);
