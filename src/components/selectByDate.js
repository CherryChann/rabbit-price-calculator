import React from 'react';
import { Row, Col} from 'react-bootstrap';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";

const selectByDate = ({startDate,onChange}) => (
    <Row>
        <Col lg="2" xs="12">
            <span>Date: </span>
            
        </Col>
        <Col lg="3" xs="12" className="form-group">
            <DatePicker
                className="custom-date-picker"
                selected={startDate}
                onChange = {
                    date => onChange(date)
                }
                placeholderText="Select a date after 5 days ago"/>
        </Col>
    </Row>
)

export default selectByDate;