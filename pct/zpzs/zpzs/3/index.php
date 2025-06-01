<?php
    if (isset($_GET['ci'])){
      $ci = $_GET['ci'];
      $Time = $_GET['Time'];
      $dj = $_GET['dj'];
      
      $jsonFilePath = 'index.json';

      // 1. 读取JSON文件内容
      $jsonContent = file_get_contents($jsonFilePath);

      // 2. 将JSON解码为PHP数组
      $dataArray = json_decode($jsonContent, true);

      // 检查解码是否成功
      if (json_last_error() !== JSON_ERROR_NONE) {
        die('JSON decode error: ' . json_last_error_msg());
      }

      // 3. 修改数组中的数据
      // 假设我们想要修改数组中的某个值，例如键为 'name' 的值
      $dataArray['lishi'] = $ci;
      
      $dataArray['Time'] = '时间：' . $Time . 's';
      
      $dataArray['dj'] = $dj . '次';

      // 4. 将修改后的数组编码回JSON格式
      $jsonData = json_encode($dataArray, JSON_PRETTY_PRINT);

      // 检查编码是否成功
      if (json_last_error() !== JSON_ERROR_NONE) {
        die('JSON encode error: ' . json_last_error_msg());
      }

      // 5. 将新的JSON数据写回文件
      if (file_put_contents($jsonFilePath, $jsonData) === false) {
        die('Failed to write JSON data to file.');
      }
      
    }else{
      echo "次数不存在"; 
    }
?>