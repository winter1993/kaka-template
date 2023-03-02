//由模板页面向父级发送信息
export const postMsgToParent = (message) => {
    window.parent.postMessage(
        message,
        "*"
    )
}