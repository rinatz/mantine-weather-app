export type WeatherByLocationResponse = {
  /**
   * 地名
   */
  locationName: string;

  /**
   * 時間ごとの天気予報
   */
  hourly: {
    time: string; // 時間
    forecast: string; // 天気予報
    temperature: {
      current: number; // 現在の気温
      apparent: number; // 体感温度
    };
    precipitationProbability: number; // 降水確率
  }[];

  /**
   * 日ごとの天気予報
   */
  daily: {
    time: string; // 日付
    forecast: string; // 天気予報
    temperature: {
      max: number; // 最高気温
      min: number; // 最低気温
    };
    precipitationProbability: number; // 降水確率
  }[];
};
