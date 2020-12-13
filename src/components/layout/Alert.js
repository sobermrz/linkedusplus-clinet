import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

//從store裡的state獲取alerts的資料
const Alert = ({ alerts }) => alerts !== null && alerts.length > 0 && alerts.map(alert => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
    </div>
));

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    alerts: state.alert
});

//將本地的props.alerts和store裡的state.alert connect在一起
//用來實現一旦資料發生變化，將進行局部更新
export default connect(mapStateToProps)(Alert);
