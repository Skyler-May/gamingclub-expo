# 使用说明

```bash
// 父组件中使用
import React from 'react';
import { View } from 'react-native';
import GetLotteryResults, { NEWMO_API_URL, MO_API_URL, MOTHREE_API_URL } from './GetLotteryResults';

const ParentComponent = () => {
  return (
    <View>
      {/* 使用不同的API端点 */}
      <GetLotteryResults
        apiUrl={NEWMO_API_URL}
        showExpect={true}
        showOpenCode={true}
        // ...其他props
      />

      {/* 另一个实例使用不同的API */}
      <GetLotteryResults
        apiUrl={MO_API_URL}
        showExpect={true}
        showZodiac={true}
        // ...其他props
      />
    </View>
  );
};

export default ParentComponent;
```
