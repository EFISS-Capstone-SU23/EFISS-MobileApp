import { Modal } from 'react-native'
import React from 'react'

const BottomPopup = () => {

    close = () => {
        this.props.close()
    }

    show = () => {
        this.props.show();
    }

    return (
        <Modal
            animationType={'fade'}
            transparent={true}
            visible={true}
            onRequestClose={this.close}
        >

        </Modal>
    )
}

export default BottomPopup