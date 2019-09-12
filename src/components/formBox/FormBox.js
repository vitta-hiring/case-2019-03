import React from 'react'

import Box from './Box'
import Page from './Page'

const FormBox = ({ children, style }) => (
    <Page style={style}>
        <Box>{children}</Box>
    </Page>
)

export default FormBox
