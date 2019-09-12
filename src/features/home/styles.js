import styled from 'styled-components'

export const Container = styled.section`
    background: #ffff;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;

    h3 {
        font-weight: 100;
        text-align: center;
        font-size: 30px;
        color: #527db9;
        margin: 40px;
        width: 800px;
    }

    span {
        font-weight: bold;
        color: #21b2d5;
    }
`
export const Box = styled.div`
    display: flex;
    justify-content: space-between;
    width: 800px;

    div {
        width: 200px;
        display: flex;
        align-items: center;
        flex-direction: column;
        text-align: center;
    }
`
