import React, { Component } from 'react'

import { Input } from 'antd';
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'

// const validColor = 'green'
// const inputColor = '#021b47'
// const styles = {
//     underlineStyle: {
//         borderColor: inputColor,
//     },
//     underlineFocusStyle: {
//         borderColor: inputColor,
//     },
//     floatingLabelStyle: {
//         color: inputColor,
//     },
//     floatingLabelFocusStyle: {
//         color: inputColor,
//     },
//     floatingLabelShrinkStyle: {
//         color: inputColor,
//     }
// };

export default class InputField extends Component {

    static defaultProps = {
        valid: null
    }

    state = {
        value: '',
    }

    validation(value, pattern, condition, message) {
        if (value === '') {
            this.setState({ condition: null });
            return;
        }

        condition = pattern.test(value);

        if (condition === false) 
            this.setState({ condition: message })
        else 
            this.setState({ condition: true })
    }

    _onChangeValue = (event) => {
        const value = event.target.value
        this.setState({ value }, () => {
            if (this.props.onChange) this.props.onChange(value)
        })
    }

    render() {
        return (
            <div className="input-field">
                <Input
                    {...this.props}
                    value={this.state.value}
                    onChange={this._onChangeValue}
                    // underlineStyle={{ borderColor: this.props.valid === true ? validColor : inputColor }}
                    // underlineFocusStyle={{ borderColor: this.props.valid === true ? validColor : inputColor }}
                    // floatingLabelStyle={styles.floatingLabelStyle}
                    // floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                    // floatingLabelShrinkStyle={styles.floatingLabelShrinkStyle}
                    // errorText={typeof this.props.valid === 'string' ? this.props.valid : false}
                />
            </div>
        )
    }
}