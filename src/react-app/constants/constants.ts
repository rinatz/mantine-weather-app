import { ja } from "date-fns/locale";
import {
  IconCloud,
  IconSun,
  IconMist,
  IconCloudRain,
  IconCloudSnow,
  IconCloudStorm,
} from "@tabler/icons-react";

export const LOCALE = ja;

export const WEATHER_CODE_MAP: Record<
  number,
  { icon: React.ElementType; text: string }
> = {
  0: { icon: IconSun, text: "快晴" },
  1: { icon: IconSun, text: "ほぼ晴れ" },
  2: { icon: IconCloud, text: "薄曇り" },
  3: { icon: IconCloud, text: "曇り" },
  45: { icon: IconMist, text: "霧" },
  48: { icon: IconMist, text: "樹氷を伴う霧" },
  51: { icon: IconCloudRain, text: "霧雨（弱い）" },
  53: { icon: IconCloudRain, text: "霧雨（やや強い）" },
  55: { icon: IconCloudRain, text: "霧雨（強い）" },
  56: { icon: IconCloudRain, text: "着氷性の霧雨（弱い）" },
  57: { icon: IconCloudRain, text: "着氷性の霧雨（強い）" },
  61: { icon: IconCloudRain, text: "雨（弱い）" },
  63: { icon: IconCloudRain, text: "雨（やや強い）" },
  65: { icon: IconCloudRain, text: "雨（強い）" },
  66: { icon: IconCloudRain, text: "着氷性の雨（弱い）" },
  67: { icon: IconCloudRain, text: "着氷性の雨（強い）" },
  80: { icon: IconCloudRain, text: "にわか雨（弱い）" },
  81: { icon: IconCloudRain, text: "にわか雨（やや強い）" },
  82: { icon: IconCloudRain, text: "にわか雨（非常に強い）" },
  71: { icon: IconCloudSnow, text: "降雪（弱い）" },
  73: { icon: IconCloudSnow, text: "降雪（やや強い）" },
  75: { icon: IconCloudSnow, text: "降雪（強い）" },
  77: { icon: IconCloudSnow, text: "雪あられ" },
  85: { icon: IconCloudSnow, text: "にわか雪（弱い）" },
  86: { icon: IconCloudSnow, text: "にわか雪（強い）" },
  95: { icon: IconCloudStorm, text: "雷雨（弱い〜中程度）" },
  96: { icon: IconCloudStorm, text: "ひょうを伴う雷雨（弱い）" },
  99: { icon: IconCloudStorm, text: "ひょうを伴う雷雨（強い）" },
};
