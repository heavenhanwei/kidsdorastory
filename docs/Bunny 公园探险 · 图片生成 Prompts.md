# Bunny 公园探险 · 图片生成 Prompts

版本：v2.0　｜　日期：2026-10-11　｜　配套文档：《Bunny 公园探险 · Demo 需求文档》（bunny-demo-prd.md）

本文档列出 Demo 需要的全部图片，按"部件"和"场景"拆分，可以直接交给图像生成 AI 使用。物品、幕次、绘本页都和需求文档保持一致。

---

## 0. 使用说明

### 0.1 怎么拼一条完整的 prompt

```
完整 prompt = 通用画风（0.2）＋ 本条 prompt ＋ 通用负面词（0.4）
夜晚画面：用 0.3 的夜晚配色，替换 0.2 中的 "Limited palette" 那一句
3D 概念图：用 0.5 的 3D 画风，替换 0.2 的整段
```

Prompt 用英文写，生成效果更稳定；中文只用于说明。

### 0.2 通用画风（2D：卡片、绘本、界面、故事板）

```text
Children's picture book illustration for ages 4-6, soft watercolor with light colored-pencil outlines, visible cream paper grain, gentle rounded shapes, warm natural light, calm and cozy mood. Limited palette: leaf green #2E8B57, autumn amber #E9A830, berry pink #D9577A, sky blue #CFE6F0, cream paper #FBF5E8. Original characters only.
```

### 0.3 夜晚配色

```text
Night palette: deep indigo #2B3566, soft moon yellow #F4E3A1, muted lavender #8E98D8, warm lamp glow. Low contrast, dreamy, sleepy atmosphere.
```

### 0.4 通用负面词

```text
no text, no letters, no numbers, no watermark, no logo, no photorealism, no glossy plastic look, no realistic human face, no resemblance to any existing cartoon character or brand mascot, no scary elements, no sharp teeth, no danger, no extra limbs, no cluttered background
```

### 0.5 3D 画风（只用于第 5 节的 3D 概念图）

```text
Stylized 3D diorama, low-poly shapes with soft matte clay-like materials, rounded edges, gentle ambient occlusion, warm soft lighting, tilt-shift miniature feeling, same palette as the picture book: leaf green #2E8B57, autumn amber #E9A830, berry pink #D9577A, sky blue #CFE6F0, cream #FBF5E8. Original characters only.
```

### 0.6 一致性规则

- 先定稿角色设定图（第 1 节），之后每张场景图都把设定图作为参考图输入（image reference / character reference）。
- 图里不放任何文字。英文单词、句子、按钮文案都由前端叠加，方便修改，也避免模型写错字。
- 小作者用卡通形象，不上传、不生成孩子的真实面孔。
- 白天画面用通用配色。睡前绘本的真实页仍是白天，从过渡页开始换成夜晚配色。
- 同一组图固定 seed，只改动作和场景描述。

### 0.7 尺寸约定

| 用途 | 比例 | 建议像素 |
| --- | --- | --- |
| 角色设定图 | 16:9 | 2048 × 1152 |
| 物品单体素材、图标、徽章 | 1:1，纯白或透明背景 | 1024 × 1024 |
| 集卡卡面 | 3:4 | 1536 × 2048 |
| 故事板场景（手机界面背景） | 9:16 | 1152 × 2048 |
| 绘本内页、封面 | 4:3 | 2048 × 1536 |
| 3D 概念图、大屏画面 | 16:9 | 3840 × 2160 |
| 现场海报 | 3:4 | 3000 × 4000 |

### 0.8 图片清单总览

| 节 | 类别 | 编号 | 数量 | 在 Demo 中的用途 |
| --- | --- | --- | --- | --- |
| 1 | 角色设定 | C1–C7 | 7 | 所有画面的参考图 |
| 2 | 物品部件 | O1–O10 | 19（9 样 × 白天/夜晚 + 神秘卡） | 卡面、图鉴、绘本、识别结果 |
| 3 | 界面部件 | U1–U8 | 约 16 | 手机、iPad 界面 |
| 4 | 七幕故事板 | D1–D7 | 7 | 评委字幕旁的说明图、手机界面背景 |
| 5 | 3D 概念图 | T1–T6 | 6 | 3D 建模参考；WebGL 失败时的 2D 兜底图 |
| 6 | 睡前绘本 | B0–B12 | 13 | iPad 绘本页 |
| 7 | 现场物料 | E1–E5 | 3（另 2 项复用） | 布景、打印卡、海报、大屏开场 |

---

## 1. 角色设定

四个角色：Bunny 和小作者出现在所有画面里；奶奶只在白天出现，妈妈只在睡前出现。每个角色先出一张多角度设定图，再出表情和动作，定稿后作为后续所有画面的参考图。

### C1 Bunny 多角度设定图（16:9）

```text
Character turnaround sheet of an original small white bunny named Bunny: round soft body, two long upright ears with pink inner ears, the right ear slightly tilted, round black eyes with a white highlight, pink round cheeks, a tiny "w" shaped mouth, short stubby arms and feet, a leaf-green scarf with one short tail end. Body height about half of a 5-year-old child. Front view, three-quarter view, side view, back view, evenly spaced on a plain cream background, consistent proportions.
```

### C2 Bunny 表情（16:9）

```text
Expression sheet of the same white bunny with the leaf-green scarf, six head-and-shoulder portraits in a 3x2 grid: happy smile, curious with head tilted, listening with one ear bent forward, cheering with eyes closed and mouth open, gently surprised, sleepy with half-closed eyes. Plain cream background.
```

### C3 Bunny 动作（16:9）

```text
Pose sheet of the same white bunny with the leaf-green scarf, six full-body poses: pointing at something on the ground, clapping both paws, holding a small round magnifying glass, holding an open picture book and reading aloud, waving goodbye, curled up asleep with a tiny blanket. Plain cream background.
```

### C4 小作者多角度设定图（16:9）

```text
Character turnaround sheet of an original stylized 5-year-old Chinese girl: two round hair buns on top, dark brown hair with short soft bangs, round face, simple dot eyes, pink cheeks, small smile, an amber-yellow A-line dress over a white long-sleeve top, white socks, small brown shoes. Simple storybook style, not a realistic portrait. Front view, three-quarter view, side view, back view on a plain cream background.
```

### C5 小作者表情和动作（16:9）

```text
Pose sheet of the same girl with two hair buns and the amber-yellow dress, eight full-body poses: pointing excitedly and calling out, crouching down to look closely at the ground, smelling a small flower with eyes closed, standing very still and watching quietly, jumping with joy with both arms up, shy with hands behind her back, sitting and looking at a tablet, lying in bed asleep under a blanket. Plain cream background.
```

### C6 奶奶（16:9）

```text
Character sheet of an original kind Chinese grandmother in her sixties: short grey curly hair, gentle smile, light purple knitted cardigan, dark trousers, comfortable shoes. Three poses: holding a smartphone up with both hands to take a photo, bending down beside a child, standing and smiling while holding a small water bottle. Same storybook watercolor style, plain cream background.
```

### C7 妈妈（16:9）

```text
Character sheet of an original young Chinese mother in her thirties: low ponytail, soft grey loungewear, warm expression. Three poses: sitting on a bed reading with a child leaning against her, holding a tablet at a low angle, turning off a bedside lamp. Same storybook watercolor style, plain cream background.
```

> 如果想让卡通形象更像小作者本人，只参考她常穿的衣服颜色和发型去改 C4 的描述，不把她的照片作为参考图输入。

---

## 2. 物品部件

物品是小作者在公园里真实会看到的九样东西。每样出两个版本：白天版用在卡面、图鉴、识别结果和绘本真实页；夜晚版用在绘本想象页。全部是单体素材，纯白或透明背景，1:1。

| 编号 | 物品 | 卡片单词 | 卡片句子 | Demo 中的角色 |
| --- | --- | --- | --- | --- |
| O1 | 珠颈斑鸠 | dove | A dove on the grass. | 现场演示 |
| O2 | 桂花 | flower | Tiny yellow flowers. | 现场演示 |
| O3 | 绿皮火车 | train | A long green train. | 自动播放 |
| O4 | 小桥 | bridge | A little bridge. | 自动播放 |
| O5 | 桂花树 | tree | The tree smells sweet. | 3D 场景、图鉴 |
| O6 | 草坪的草 | grass | The grass is green. | 3D 场景、图鉴 |
| O7 | 湖泊 | lake | A big lake. | 3D 场景、图鉴 |
| O8 | 鸭子 | duck | A duck in the water. | 3D 场景、图鉴 |
| O9 | 蜗牛 | snail | A small snail. | 3D 场景、图鉴 |
| O10 | 神秘卡 | mystery | （识别失败时使用，无句子） | 兜底 |

> 桂花树和桂花用 tree、flower，不用 osmanthus，这个词对 4–6 岁太难；珠颈斑鸠用 dove。湖泊、小桥这类大景物用 vignette（边缘渐隐）构图，不用贴纸式。

### O1 珠颈斑鸠

```text
Day: a single spotted dove standing on short grass, soft pinkish-brown body, grey head, a black collar patch on the back of its neck covered with small white dots, small dark eye, calm and plump, centered sticker-style illustration on a plain white background.

Night: the same spotted dove puffed up and asleep on a low branch, head tucked in, the small white dots on its neck glowing faintly like tiny stars, a crescent moon behind, centered on a plain deep indigo background.
```

### O2 桂花

```text
Day: a close-up of one small sprig of osmanthus, three dark green leaves and a cluster of tiny four-petaled golden-yellow flowers, a few loose flowers falling, centered sticker-style illustration on a plain white background.

Night: a handful of tiny golden osmanthus flowers floating in the air like little fireflies, each with a soft glow, gentle curling lines for their sweet smell, centered on a plain deep indigo background.
```

### O3 绿皮火车

```text
Day: a classic Chinese green passenger train, dark green carriages with one pale yellow stripe along the side, rounded windows, a short train of one locomotive and two carriages seen from the side, running on a small curve of track with a bit of grass beside it, friendly and toy-like proportions, no logos, no numbers, centered sticker-style illustration on a plain white background.

Night: the same short green train with every window glowing warm yellow, gliding along a track that curves up into a starry sky, soft steam puffs shaped like little clouds, centered on a plain deep indigo background.
```

### O4 小桥

```text
Day: a small arched stone footbridge in a Chinese park, light grey stones, low simple railings, a stream of blue water passing under it with its reflection making a round circle, a little green grass on both banks, centered vignette illustration on a plain white background.

Night: the same arched bridge with two small warm lanterns glowing on its railings, the moonlit water below, a path of tiny stars leading across the bridge, centered vignette on a plain deep indigo background.
```

### O5 桂花树

```text
Day: a single round osmanthus tree with dense dark green glossy leaves, tiny golden-yellow flower clusters tucked among the leaves, a short sturdy trunk, a few tiny flowers fallen on the ground below, centered sticker-style illustration on a plain white background.

Night: the same osmanthus tree softly glowing, its tiny golden flowers drifting down slowly like warm sparks, a faint sweet-smelling haze drawn as gentle curling lines, centered on a plain deep indigo background.
```

### O6 草坪的草

```text
Day: a small round patch of fresh lawn grass seen up close, soft green blades of different heights, two shiny dew drops on the tips, one tiny fallen yellow leaf on it, centered sticker-style illustration on a plain white background.

Night: the same patch of grass with blades swaying gently, each dew drop glowing like a tiny star, centered on a plain deep indigo background.
```

### O7 湖泊

```text
Day: a small oval park lake seen from slightly above, calm light blue water reflecting white clouds, reeds and a few round stones along the edge, gentle ripples, centered vignette illustration fading into a plain white background.

Night: the same small lake perfectly still, the full moon and many stars reflected on the water, soft mist over the surface, centered vignette on a plain deep indigo background.
```

### O8 鸭子

```text
Day: a single round yellow duckling floating on a small patch of blue water, orange beak, tiny ripples around it, cheerful, centered sticker-style illustration on a plain white background.

Night: the same duckling floating in moonlit water with its beak open as if singing softly, a few small musical-note shaped ripples, centered on a plain deep indigo background.
```

### O9 蜗牛

```text
Day: a single small garden snail, light brown spiral shell with a darker swirl, soft beige body, two short eye stalks, crawling slowly on a tiny patch of grass, friendly and calm, centered sticker-style illustration on a plain white background.

Night: the same small snail glowing softly from its shell like a little lantern, tiny stars around it, centered on a plain deep indigo background.
```

### O10 神秘卡

```text
A small mysterious round object half hidden in a soft swirl of sparkles and light mist, its shape unclear and playful, inviting curiosity rather than fear, centered sticker-style illustration on a plain white background.
```

### 新增物品的通用模板

```text
Day: a single {object}, {color and one key feature}, {natural position, e.g. on grass / in water / on a branch}, friendly and calm, centered sticker-style illustration on a plain white background.

Night: the same {object} {one gentle imaginative action}, soft glow, centered on a plain deep indigo background.
```

---

## 3. 界面部件

界面部件只画图形，文字由前端叠加。卡面的图片区留空，运行时放入物品插图。手机界面给大人用（户外），iPad 界面给孩子用（在家），见需求文档第 5 节。

```
  卡片结构（3:4）
  ┌───────────────────┐
  │ ✿               ✿ │  ← U1 琥珀色边框，四角小装饰
  │  ┌─────────────┐  │
  │  │             │  │
  │  │  图片区 60%  │  │  ← 运行时放 O 系列白天版
  │  │             │  │
  │  └─────────────┘  │
  │   [ 单词 + 句子 ]  │  ← 前端叠加文字
  │ ✿               ✿ │
  └───────────────────┘
```

### U1 卡片边框（3:4，透明背景）

```text
A collectible card frame for a children's app, portrait 3:4, thick rounded amber-yellow border with a hand-painted watercolor edge, small osmanthus flower and leaf ornaments in the four corners, a large empty rounded window in the upper 60 percent for a picture, an empty cream band below it for a word, transparent background, flat front view, no text.
```

### U2 卡背（3:4）

```text
The back of a collectible children's card, portrait 3:4, leaf-green watercolor background with a soft repeating pattern of tiny bunny-ear silhouettes and small leaves, a round cream emblem in the center showing the white bunny's head with the green scarf, rounded corners, no text.
```

### U3 升级后的卡片边框（3:4，透明背景）

```text
The same collectible card frame as before, upgraded version: amber border with a thin berry-pink inner line, a few small gold sparkles along the edge, one tiny star ornament at the top center, empty picture window and empty word band, transparent background, no text.
```

### U4 图鉴剪影（1:1，九张，每样物品一张）

```text
A flat dark grey silhouette of a {spotted dove / sprig of osmanthus flowers / short green train / arched footbridge / round osmanthus tree / patch of grass / small oval lake / duckling / snail}, soft rounded edges, slightly transparent, centered on a plain white background, used as a "not found yet" placeholder, no details inside the shape.
```

### U5 Bunny 状态动画关键帧（1:1，透明背景，三张）

手机对话界面上方的 Bunny 动画，用于"说话 / 倾听 / 鼓掌"三种状态。

```text
The white bunny with the leaf-green scarf, upper body, facing the viewer, {talking: mouth open mid-word, one paw raised / listening: head tilted, one ear bent forward, eyes wide and attentive / cheering: both paws clapping, eyes closed in a happy smile}, transparent background, centered, no text.
```

### U6 记忆地图上的星星（1:1，透明背景）

```text
A single soft glowing five-pointed star, warm moon-yellow center fading to a gentle halo, slightly rounded points, hand-painted watercolor texture, transparent background, centered, no text.
```

### U7 成就徽章（1:1）

```text
A round achievement badge for a 5-year-old, watercolor style, amber-yellow medal with a berry-pink ribbon at the bottom, a magnifying glass over a small spotted dove in the center, small osmanthus flowers around the rim, centered on a plain white background, no text.
```

### U8 按钮图标（透明背景，一组）

```text
A set of six simple rounded icons for a children's app on a transparent background, thick soft strokes, leaf green fill: a big round camera shutter button, a microphone with a small hand pressing it, a speaker with sound waves, a play triangle, a pause symbol, a crescent moon with a small star. Evenly spaced in one row, no text.
```

---

## 4. 七幕故事板

每幕一张，9:16。用途有两个：作为手机界面的背景，以及大屏左下角评委字幕旁的说明图。

**规则**：Bunny 住在手机里。在现实画面中，它只出现在手机屏幕上；只有绘本里，它才和小作者一起走在画面中。

| 编号 | 幕 | 画面 | 交互方式（见需求文档第 3 节） |
| --- | --- | --- | --- |
| D1 | 1 出门 | 门口穿鞋，手机里的 Bunny 说出今天的任务 | 语音，只听 |
| D2 | 2 发现 | 小作者指着草坪上的珠颈斑鸠喊"快看" | 语音唤醒 |
| D3 | 3 拍照 | 奶奶按下拍照按钮的手机特写 | 手机，大人按 |
| D4 | 4 对话 | 小作者对着手机里的 Bunny 说单词 | 语音，3 轮 |
| D5 | 5 得卡 | 卡片在手机上翻开，小作者跳起来 | 手机，看一眼 |
| D6 | 6 回家 | 晚饭后捧着 iPad 翻图鉴，和妈妈说话 | iPad + 语音 |
| D7 | 7 睡前 | 床上靠着妈妈看 iPad 绘本 | iPad，自动翻页 |

### D1 出门

```text
Inside the front door of a cozy Chinese apartment in late afternoon, the girl with two hair buns and the amber dress sits on a small stool putting on her brown shoes, the grandmother in the purple cardigan holds a smartphone toward her with its speaker facing the girl, on the phone screen the small white bunny with the green scarf waves happily, the girl listens with a curious smile, warm light through the doorway, vertical 9:16.
```

### D2 发现珠颈斑鸠

```text
In a small neighborhood park in October, the girl with two hair buns stands on the lawn pointing excitedly at a spotted dove walking on the grass a few steps away, her mouth open as if calling out "look!", the grandmother behind her smiling and taking a smartphone out of her pocket, an osmanthus tree with tiny golden flowers in the background, late afternoon light, vertical 9:16.
```

### D3 拍照

```text
Over-the-shoulder view from behind the grandmother: her hands hold a smartphone showing the spotted dove on its screen inside a soft rounded viewfinder, one big round green shutter button at the bottom of the screen, her thumb about to press it, the real dove and the girl's small shoes visible softly out of focus beyond the phone, vertical 9:16.
```

### D4 和 Bunny 对话

```text
The girl with two hair buns looks at a smartphone held at her eye level by the grandmother, she says a word with her mouth rounded, a little proud and a little shy, on the phone screen the white bunny with the green scarf leans forward listening with one ear bent, soft sound-wave lines drawn between the girl and the phone, the spotted dove and the lawn softly blurred behind, vertical 9:16.
```

### D5 得到卡片

```text
The girl with two hair buns jumps with both arms up in joy, in front of her a collectible card with an amber border floats up from the smartphone and flips open with small gold sparkles, the card shows the spotted dove, the grandmother laughs beside her, autumn park with an osmanthus tree behind, vertical 9:16.
```

### D6 回家看图鉴

```text
A warm Chinese living room in the evening after dinner, the girl with two hair buns sits on a sofa holding a tablet with both hands, the screen shows a large card of a spotted dove with small grey silhouettes beside it, she looks up and talks to the young mother with a low ponytail sitting next to her, through the window the park is visible far away at dusk, soft lamp light, vertical 9:16.
```

### D7 睡前看绘本

```text
A cozy child's bedroom at night, the girl with two hair buns in pajamas sits in bed leaning against the young mother, a tablet rests on a small stand in front of them showing a watercolor picture book page of a sleeping dove under the moon, the screen is dim and warm, a small bedside lamp glows, the girl's eyes are getting sleepy, vertical 9:16.
```

---

## 5. 3D 概念图

这一节的图有两个用途：

- **3D 建模参考**：给建模的人看构图、比例和配色；
- **2D 兜底图**：WebGL 不可用时，网页直接显示这些图，流程不受影响（需求文档 6.6 节）。

全部使用 0.5 的 3D 画风，16:9。

```
  公园布局（T1、T5、T6 共用，保持一致）
  ═══════════════════════════════════════════  ← 铁轨（绿皮火车）
       ✿ 桂花树                      长椅
      (桂花飘落)                     ▭▭▭  @ 蜗牛
            ┌───────────────────┐
            │      湖 泊        │       ,,, 草坪 ,,,
            │   ⌒⌒ 小桥 ⌒⌒     │       ,,  斑鸠  ,,
            │       鸭子         │       ,,,,,,,,,,,,
            └───────────────────┘
   入口 ▶ ··········· 小路 ···········
```

### T1 公园全景（下午）

```text
Stylized 3D diorama of a small neighborhood park in a Chinese city in October, late afternoon, three-quarter elevated view: a railway track along the far edge with a short green passenger train, a round osmanthus tree with tiny golden flowers on the left, a calm oval lake in the middle with a small arched stone bridge over its narrow end and a yellow duckling on the water, a lawn on the right with a spotted dove walking, a wooden bench with a tiny snail near its leg, a curved path from the entrance at the bottom, the small girl with two hair buns and the white bunny with the green scarf walking on the path, warm afternoon light, no text.
```

### T2 物体特写镜头（傍晚，以珠颈斑鸠为例）

```text
Stylized 3D close-up at ground level on the lawn of the park: a spotted dove standing on the grass, softly highlighted by a gentle rim light, the osmanthus tree and the lake blurred in the background, late afternoon turning orange, shallow depth of field, no text.
```

### T3 客厅（晚上，第 6 幕）

```text
Stylized 3D diorama of a cozy Chinese living room in the evening: a soft sofa, a low wooden table, a warm floor lamp, a tablet resting on the sofa cushion, a large window showing the small park far away at dusk with the railway and the lake visible, calm and homely, no text.
```

### T4 卧室（夜晚，第 7 幕）

```text
Stylized 3D diorama of a small child's bedroom at night: a bed with a berry-pink blanket, a small bedside lamp with warm light, a tablet on a little stand, a window with a crescent moon and stars, a few small toys on a shelf, very calm and dim, no text.
```

### T5 夜晚公园

```text
Stylized 3D diorama of the same park at night, same layout as the afternoon view: stars in a deep indigo sky, warm lanterns glowing on the arched bridge, the moon reflected in the lake, the green train passing with its windows lit warm yellow, the osmanthus tree glowing faintly, no characters, peaceful, no text.
```

### T6 记忆地图（俯视）

```text
Stylized 3D top-down view of the same park at dusk, like a gentle storybook map: the railway, the osmanthus tree, the lake with the bridge, the lawn, the bench, the path, all clearly readable from above; above the spotted dove on the lawn and above the osmanthus tree, two soft glowing moon-yellow stars float with a faint beam of light down to each spot, no text.
```

---

## 6. 睡前绘本

绘本按当天得到的卡片拼页。现场演示（斑鸠、桂花）共 7 页；自动播放（斑鸠、桂花、火车、小桥）共 11 页；另加一张关灯画面。全部 4:3，每页一张图配一句话，句子由前端叠加在图下方，图里不放字。

```
  现场演示（7 页）
  封面 → 真实·斑鸠 → 真实·桂花 → 过渡 → 想象·斑鸠 → 想象·桂花 → 晚安   （→ 关灯画面）
  自动播放（11 页）
  封面 → 真实×4（斑鸠、桂花、火车、小桥）→ 过渡 → 想象×4 → 晚安          （→ 关灯画面）
  └────── 白天配色 ──────┘          └────── 夜晚配色，越往后越暗、越安静 ──────┘
```

### 6.1 画面规则

- 真实页只画当天真实发生的事，不添加孩子没做过的细节。
- 想象页要画得明显不可能发生（斑鸠脖子上的点变成星星、火车开进星空），让孩子分得清哪些是想象。
- 想象页里没有危险、追逐、迷路，画面安静、柔和。
- 越往后的页面，颜色越暗、构图越安静。
- 主角在画面中用第三人称出现（就是"朵朵"这个角色），不画成第一人称视角。

### 6.2 页面与句子

| 页 | 类型 | 配的句子（前端叠加） | 现场 | 自动播放 |
| --- | --- | --- | --- | --- |
| B0 | 封面 | 朵朵的秋天探险 / 作者：朵朵 和 Bunny | ✓ | ✓ |
| B1 | 真实 | 朵朵发现了一只斑鸠。A dove on the grass. | ✓ | ✓ |
| B2 | 真实 | 朵朵闻到了桂花的香味。Tiny yellow flowers. | ✓ | ✓ |
| B3 | 真实 | 朵朵看到了一列绿皮火车。A long green train. | | ✓ |
| B4 | 真实 | 朵朵走过了一座小桥。A little bridge. | | ✓ |
| B5 | 过渡 | 这些都是朵朵今天真的发现的。现在，闭上眼睛，我们来想象一下…… | ✓ | ✓ |
| B6 | 想象 | dove 在树枝上睡着了，脖子上的小白点像星星。 | ✓ | ✓ |
| B7 | 想象 | 小小的 flower 飘起来，像会发光的萤火虫。 | ✓ | ✓ |
| B8 | 想象 | train 的窗户亮起来，开进了星星里。 | | ✓ |
| B9 | 想象 | bridge 上亮起小灯笼，一条星星小路通向对岸。 | | ✓ |
| B10 | 晚安 | Good night, dove. Good night, flower. … Good night, 朵朵。 | ✓ | ✓ |
| B11 | 关灯 | （无字，纯声音继续） | ✓ | ✓ |
| B12 | 神秘页（备用） | 朵朵还发现了一个神秘的东西，明天再去看看它是什么吧。 | 识别失败时 | 识别失败时 |

### B0 封面

```text
Picture book cover, horizontal 4:3: the girl with two hair buns and the amber dress stands proudly in the autumn park next to the white bunny with the green scarf, both smiling at the viewer, around their feet a spotted dove, a sprig of golden osmanthus flowers, a tiny green toy-like train and a small arched bridge arranged in a gentle arc, a round osmanthus tree behind them, leave the top 30 percent as soft sky for a title to be added later.
```

### B1 真实：斑鸠

```text
Picture book page, horizontal 4:3, daytime autumn park: the girl with two hair buns stands very still on the lawn watching a spotted dove walking on the grass, the white bunny with the green scarf stands beside her copying her quiet pose, the dove is the clear focus in the center of the page, soft afternoon light, simple background.
```

### B2 真实：桂花

```text
Picture book page, horizontal 4:3, daytime autumn park: the girl with two hair buns stands under a round osmanthus tree with her eyes closed, smelling a low sprig of tiny golden flowers, the white bunny beside her sniffing too with its nose up, a few tiny flowers falling around them, soft afternoon light, simple background.
```

### B3 真实：绿皮火车

```text
Picture book page, horizontal 4:3, daytime: the girl with two hair buns and the white bunny stand behind the low park fence waving at a short green passenger train passing along the track at the edge of the park, the train has a pale yellow stripe and round windows, no logos, no numbers, soft afternoon light, simple background.
```

### B4 真实：小桥

```text
Picture book page, horizontal 4:3, daytime: the girl with two hair buns walks across a small arched stone footbridge over a calm lake, holding the railing with one hand, the white bunny hops beside her, their reflections visible in the water, a yellow duckling floating nearby, soft late afternoon light.
```

### B5 过渡页

```text
Picture book page, horizontal 4:3, dusk turning to night: the girl with two hair buns and the white bunny sit side by side on a small grassy hill, looking up at the first stars, a thin crescent moon, the things they found today (a spotted dove, golden osmanthus flowers, a little green train, a small bridge) shown as small soft glowing shapes floating in the sky like a gentle memory, calm and quiet.
```

### B6 想象：斑鸠

```text
Picture book page, horizontal 4:3, night dream scene: a spotted dove sleeps puffed up on a low branch of the osmanthus tree, the small white dots on its neck have become tiny glowing stars, the girl with two hair buns and the white bunny look up at it from below with sleepy smiles, crescent moon, peaceful.
```

### B7 想象：桂花

```text
Picture book page, horizontal 4:3, night dream scene: tiny golden osmanthus flowers float up from the tree into the night air, each glowing softly like a firefly, the girl with two hair buns and the white bunny sit on the grass watching them rise, one flower resting gently on the girl's open palm, peaceful.
```

### B8 想象：绿皮火车

```text
Picture book page, horizontal 4:3, night dream scene: the short green train with every window glowing warm yellow glides along a track that curves gently up into a starry sky, the girl with two hair buns and the white bunny look out of one lit window smiling calmly, soft steam puffs shaped like little clouds, no sense of speed, peaceful.
```

### B9 想象：小桥

```text
Picture book page, horizontal 4:3, night dream scene: the small arched bridge with two warm lanterns on its railings, a path of tiny glowing stars leading across it to the other side of the moonlit lake, the girl with two hair buns and the white bunny walk slowly hand in hand along the star path, peaceful.
```

### B10 晚安页

```text
Picture book page, horizontal 4:3, a cozy child's bedroom at night: the girl with two hair buns asleep in bed under a berry-pink blanket, the white bunny curled up asleep at the foot of the bed, on the windowsill a small sleeping spotted dove, a tiny sprig of osmanthus in a little cup, a toy-sized green train and a tiny bridge, crescent moon outside the window, dim warm lamp, very calm.
```

### B11 关灯画面

```text
Almost completely dark image, horizontal 4:3: a very faint crescent moon through a window and a few tiny dim stars on a near-black indigo background, no characters visible, extremely low brightness, suitable for a screen that should not disturb sleep.
```

### B12 神秘页（备用）

```text
Picture book page, horizontal 4:3, dusk: the girl with two hair buns and the white bunny crouch together looking at a small mysterious round object half hidden in sparkles and soft mist on the grass, their faces curious and calm, gentle and inviting, not scary.
```

---

## 7. 现场物料

现场物料复用前面定稿的角色和物品，只多出布景、打印件和主视觉三类。打印件的文字和比赛信息由设计软件排版，不让模型生成。

### E1 迷你公园布景概念图（16:9，给布置舞台的人参考）

```text
Concept illustration of a small stage corner set up as a mini autumn park for a children's demo: a low round green rug like a lawn, a small potted osmanthus tree with tiny golden flowers, a child-height wooden bench, a soft plush spotted dove standing on the rug at a child's eye level, a few real fallen leaves, a large screen behind showing a 3D park with the white bunny with the green scarf, a small directional microphone on a short stand, warm soft lighting, no people, wide 16:9.
```

### E2 实体卡片正面（扑克牌尺寸 63 × 88 mm，出图 1500 × 2100）

直接用 U1 卡片边框 + O1–O4 白天版物品图，在设计软件里排上单词和句子，不需要单独生成。

### E3 实体绘本

直接用 B0–B10 排版打印，小开本，赛后送给小作者。

### E4 主视觉海报（3:4）

```text
Key visual poster, vertical 3:4: the girl with two hair buns and the amber dress walks along a curved park path holding hands with the white bunny with the green scarf, the path starts in a sunny autumn afternoon at the bottom beside an osmanthus tree and a lawn with a spotted dove, crosses a small arched bridge over a lake, and gradually turns into a starry indigo night at the top where a green train with glowing windows curves into the sky, a small open picture book glowing near the moon, leave the top 25 percent clear for a title, no text.
```

### E5 大屏开场画面（16:9）

```text
Wide 16:9 banner: an autumn park scene on the left with an osmanthus tree, a lawn with a spotted dove and a small arched bridge, blending smoothly into a calm starry night on the right with the green train's lit windows and a crescent moon, the white bunny with the green scarf in the middle waving, small collectible cards of a dove, osmanthus flowers, a train and a bridge floating in a gentle arc from left to right, generous empty space in the center top for a title, no text.
```

---

## 8. 生成顺序与验收

### 8.1 生成顺序

按依赖顺序生成，每一步定稿后再进入下一步；前面的图是后面的参考图。

```
 ① 画风测试 ──▶ ② 角色 ──▶ ③ 物品 ──▶ ④ 界面部件
   (B7 出 2–3 版)   C1→C2,C3        O1–O10       U1–U8
                    →C4→C5                         │
                    →C6,C7                         ▼
                                     ⑤ 睡前绘本 B0–B12（参考 C1、C4、O 夜晚版）
                                                   │
                                                   ▼
                                     ⑥ 七幕故事板 D1–D7（参考全部角色）
                                                   │
                                                   ▼
                                     ⑦ 3D 概念图 T1–T6（交给建模）
                                                   │
                                                   ▼
                                     ⑧ 现场物料 E1、E4、E5
```

**比赛前的最低需求**（时间不够时先做这些）：C1、C4、O1–O4 白天和夜晚版、O10、U1、U5、U6、B0–B2、B5–B7、B10、B11、T1、T5、T6。

### 8.2 每张图的验收清单

- [ ] Bunny 和设定图一致：白色、粉色内耳、右耳微斜、绿色围巾。
- [ ] 小作者和设定图一致：双丸子头、琥珀色连衣裙、点状眼睛。
- [ ] 图里没有任何文字、字母、数字或水印（火车上也没有车号和标志）。
- [ ] 没有写实的人脸，也不像任何已有的卡通角色。
- [ ] 物品一眼能认出来，和卡片单词对得上；珠颈斑鸠的颈部白点清晰。
- [ ] 真实页只画真实发生的事；想象页明显是想象。
- [ ] 睡前页面没有危险、紧张的元素，越往后越暗、越安静。
- [ ] 3D 概念图的公园布局和 T1 一致（铁轨在远处，湖和桥在中间，草坪在右）。
- [ ] 比例和尺寸符合 0.7 的尺寸约定；界面背景下方留出叠加区域。

### 8.3 文件命名

```
角色    C{编号}_{名称}.png          例：C1_bunny_turnaround.png
物品    O{编号}_{单词}_{day|night}.png   例：O1_dove_day.png
界面    U{编号}_{名称}.png          例：U5_bunny_listening.png
故事板  D{编号}_{幕名}.png          例：D2_discover.png
3D      T{编号}_{名称}.png          例：T6_memory_map.png
绘本    B{编号}_{名称}.png          例：B6_dream_dove.png
现场    E{编号}_{名称}.png          例：E4_poster.png
```