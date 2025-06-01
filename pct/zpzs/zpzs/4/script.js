// script.js
document.getElementById('generateButton').addEventListener('click', function() {
    const text = document.getElementById('textInput').value;
    const number = parseInt(document.getElementById('numberInput').value, 10);
    const outputText = document.getElementById('outputText');
    const copyButton = document.getElementById('copyButton');

    if (isNaN(number) || number < 1) {
        outputText.textContent = '请输入有效的数字。';
        copyButton.disabled = true;
        return;
    }

    let result = '';
    for (let i = 0; i < number; i++) {
        result += `${i + 1}. ${text}\n`;
    }

    outputText.textContent = result;
    copyButton.disabled = false;
});

document.getElementById('copyButton').addEventListener('click', function() {
    const outputText = document.getElementById('outputText').textContent;
    const tempTextarea = document.getElementById('tempTextarea');
    tempTextarea.value = outputText;
    tempTextarea.select();
    tempTextarea.setSelectionRange(0, 99999); // 对于移动设备

    try {
        const successful = document.execCommand('copy');
        if (successful) {
            alert('文本已复制到剪贴板！');
        } else {
            alert('复制失败，请手动复制。');
        }
    } catch (err) {
        console.error('复制失败: ', err);
        alert('复制失败，请手动复制。');
    }
});