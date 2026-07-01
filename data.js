// ========== 十六强淘汰赛数据（基于小组赛真实进球数据） ==========

// 淘汰赛16支球队
const TEAMS = [
    { id: 'rsa', name: '南非', flag: '🇿🇦', rank: 0, conf: '非洲', strength: 68 },
    { id: 'can', name: '加拿大', flag: '🇨🇦', rank: 0, conf: '北美', strength: 74 },
    { id: 'bra', name: '巴西', flag: '🇧🇷', rank: 0, conf: '南美', strength: 88 },
    { id: 'jpn', name: '日本', flag: '🇯🇵', rank: 0, conf: '亚洲', strength: 79 },
    { id: 'ger', name: '德国', flag: '🇩🇪', rank: 0, conf: '欧洲', strength: 88 },
    { id: 'par', name: '巴拉圭', flag: '🇵🇾', rank: 0, conf: '南美', strength: 75 },
    { id: 'ned', name: '荷兰', flag: '🇳🇱', rank: 0, conf: '欧洲', strength: 84 },
    { id: 'mor', name: '摩洛哥', flag: '🇲🇦', rank: 0, conf: '非洲', strength: 78 },
    { id: 'civ', name: '科特迪瓦', flag: '🇨🇮', rank: 0, conf: '非洲', strength: 76 },
    { id: 'nor', name: '挪威', flag: '🇳🇴', rank: 0, conf: '欧洲', strength: 78 },
    { id: 'fra', name: '法国', flag: '🇫🇷', rank: 0, conf: '欧洲', strength: 91 },
    { id: 'swe', name: '瑞典', flag: '🇸🇪', rank: 0, conf: '欧洲', strength: 77 },
    { id: 'mex', name: '墨西哥', flag: '🇲🇽', rank: 0, conf: '北美', strength: 76 },
    { id: 'ecu', name: '厄瓜多尔', flag: '🇪🇨', rank: 0, conf: '南美', strength: 75 },
    { id: 'eng', name: '英格兰', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rank: 0, conf: '欧洲', strength: 89 },
    { id: 'cod', name: '刚果（金）', flag: '🇨🇩', rank: 0, conf: '非洲', strength: 73 },
    { id: 'bel', name: '比利时', flag: '🇧🇪', rank: 0, conf: '欧洲', strength: 84 },
    { id: 'sen', name: '塞内加尔', flag: '🇸🇳', rank: 0, conf: '非洲', strength: 77 },
    { id: 'usa', name: '美国', flag: '🇺🇸', rank: 0, conf: '北美', strength: 76 },
    { id: 'biH', name: '波黑', flag: '🇧🇦', rank: 0, conf: '欧洲', strength: 74 },
    { id: 'esp', name: '西班牙', flag: '🇪🇸', rank: 0, conf: '欧洲', strength: 90 },
    { id: 'aut', name: '奥地利', flag: '🇦🇹', rank: 0, conf: '欧洲', strength: 78 },
    { id: 'por', name: '葡萄牙', flag: '🇵🇹', rank: 0, conf: '欧洲', strength: 86 },
    { id: 'cro', name: '克罗地亚', flag: '🇭🇷', rank: 0, conf: '欧洲', strength: 82 },
    { id: 'sui', name: '瑞士', flag: '🇨🇭', rank: 0, conf: '欧洲', strength: 77 },
    { id: 'dza', name: '阿尔及利亚', flag: '🇩🇿', rank: 0, conf: '非洲', strength: 73 },
    { id: 'aus', name: '澳大利亚', flag: '🇦🇺', rank: 0, conf: '亚洲', strength: 75 },
    { id: 'egy', name: '埃及', flag: '🇪🇬', rank: 0, conf: '非洲', strength: 76 },
    { id: 'arg', name: '阿根廷', flag: '🇦🇷', rank: 0, conf: '南美', strength: 92 },
    { id: 'cpv', name: '佛得角', flag: '🇨🇻', rank: 0, conf: '非洲', strength: 70 },
    { id: 'col', name: '哥伦比亚', flag: '🇨🇴', rank: 0, conf: '南美', strength: 80 },
    { id: 'gha', name: '加纳', flag: '🇬🇭', rank: 0, conf: '非洲', strength: 74 },
];

// 1/16决赛对阵（基于小组赛真实场均进球 × 淘汰赛调整系数 0.82）
const MATCHUPS = [
    {
        id: 1, round: '1/16决赛 · 第一场', date: '6月29日', time: '03:00', venue: '待确认',
        home: 'rsa', away: 'can', score: '0-1', status: 'finished', winner: 'away', confidence: 47,
        analysis: {
            homeAdv: '南非小组赛1-0韩国，历史首次晋级淘汰赛',
            awayAdv: '加拿大小组赛2-1瑞士、6-0卡塔尔，强势出线',
            keyFactor: '加拿大的反击效率 vs 南非的主场气势',
            tip: '加拿大补时绝杀，历史淘汰赛首胜',
            winProb: { home: 31.4, draw: 21.7, away: 47.0 },
            scoreProbs: ['0-1(17.0%)', '0-2(12.7%)', '1-1(11.5%)', '1-2(9.5%)'],
            expectedGoals: { home: 0.68, away: 1.50 },
            predScores: ['0-1', '0-2'],
            upsetScore: '1-0'
        }
    },
    {
        id: 2, round: '1/16决赛 · 第二场', date: '6月30日', time: '01:00', venue: '待确认',
        home: 'bra', away: 'jpn', score: '2-1', status: 'finished', winner: 'home', confidence: 52,
        analysis: {
            homeAdv: '巴西小组赛7-1海地、3-0苏格兰，库尼亚双响',
            awayAdv: '日本5-1突尼斯、2-1德国，团队足球出色',
            keyFactor: '巴西的技术流 vs 日本的高位压迫',
            tip: '马丁内利绝杀，巴西挺进八强',
            winProb: { home: 47.5, draw: 24.0, away: 28.5 },
            scoreProbs: ['1-1(12.8%)', '1-0(11.7%)', '0-1(9.3%)', '2-1(8.5%)'],
            expectedGoals: { home: 1.37, away: 1.09 },
            predScores: ['1-1', '1-0'],
            upsetScore: '0-1'
        }
    },
    {
        id: 3, round: '1/16决赛 · 第三场', date: '6月30日', time: '04:30', venue: '待确认',
        home: 'ger', away: 'par', score: '1-1', status: 'finished', winner: 'away', confidence: 53,
        analysis: {
            homeAdv: '德国小组赛10-4库拉索、科特迪瓦，进攻火力强劲',
            awayAdv: '巴拉圭2-4土耳其、0-0澳大利亚，防守一般',
            keyFactor: '德国的进攻火力 vs 巴拉圭的防守',
            tip: '点球大战落败，德国难破淘汰赛魔咒',
            winProb: { home: 56.0, draw: 22.0, away: 22.0 },
            scoreProbs: ['1-0(12.5%)', '2-0(11.9%)', '1-1(10.2%)', '2-1(8.5%)'],
            expectedGoals: { home: 1.91, away: 0.82 },
            predScores: ['1-0', '2-0'],
            upsetScore: '0-1'
        }
    },
    {
        id: 4, round: '1/16决赛 · 第四场', date: '6月30日', time: '09:00', venue: '待确认',
        home: 'ned', away: 'mor', score: '1-1', status: 'finished', winner: 'away', confidence: 51,
        analysis: {
            homeAdv: '荷兰小组赛10-4瑞典、突尼斯，锋有力状态爆棚',
            awayAdv: '摩洛哥6-3海地、苏格兰，哈基米传射建功',
            keyFactor: '荷兰的进攻火力 vs 摩洛哥的反击',
            tip: '摩洛哥点球大战晋级，荷兰止步16强',
            winProb: { home: 48.0, draw: 26.0, away: 26.0 },
            scoreProbs: ['1-1(10.5%)', '2-1(9.3%)', '1-0(7.6%)', '2-0(7.2%)'],
            expectedGoals: { home: 1.78, away: 1.37 },
            predScores: ['1-1', '2-1'],
            upsetScore: '0-1'
        }
    },
    {
        id: 5, round: '1/16决赛 · 第五场', date: '7月1日', time: '01:00', venue: '待确认',
        home: 'civ', away: 'nor', score: '1-2', status: 'finished', winner: 'away', confidence: 43,
        analysis: {
            homeAdv: '科特迪瓦小组赛4-2厄瓜多尔、库拉索，阿马德绝杀',
            awayAdv: '挪威小组赛8-7伊拉克、塞内加尔，哈兰德双响',
            keyFactor: '哈兰德的进球能力 vs 科特迪瓦的团队配合',
            tip: '哈宝绝杀，挪威淘汰赛首胜',
            winProb: { home: 42.0, draw: 25.0, away: 33.0 },
            scoreProbs: ['1-1(9.5%)', '1-2(8.2%)', '2-1(8.1%)', '2-2(7.0%)', '0-1(5.6%)'],
            expectedGoals: { home: 1.70, away: 1.73 },
            predScores: ['1-1', '2-1'],
            predScores: ['1-1', '1-2'],
        }
    },
    {
        id: 6, round: '1/16决赛 · 第六场', date: '7月1日', time: '05:00', venue: '待确认',
        home: 'fra', away: 'swe', score: '-', status: 'pending', winner: null, confidence: 0,
        analysis: {
            homeAdv: '法国小组赛10-2塞内加尔、伊拉克，姆巴佩帽子戏法',
            awayAdv: '瑞典小组赛7-7突尼斯，伊萨克两传一射',
            keyFactor: '姆巴佩的个人能力 vs 瑞典的整体防守',
            tip: '姆巴佩双响，法国完胜瑞典',
            winProb: { home: 62.0, draw: 19.0, away: 19.0 },
            scoreProbs: ['2-1(8.1%)', '3-1(7.7%)', '2-0(5.8%)', '1-1(5.7%)', '2-2(5.7%)'],
            expectedGoals: { home: 2.84, away: 1.41 },
            predScores: ['2-1', '1-1'],
            predScores: ['2-1', '3-1'],
        }
    },
    {
        id: 7, round: '1/16决赛 · 第七场', date: '7月1日', time: '09:00', venue: '待确认',
        home: 'mex', away: 'ecu', score: '2-0', status: 'finished', winner: 'home', confidence: 65,
        analysis: {
            homeAdv: '墨西哥小组赛6-0韩国、捷克，防守零封对手',
            awayAdv: '厄瓜多尔小组赛2-2德国、库拉索，仅进2球',
            keyFactor: '墨西哥的零封防守 vs 厄瓜多尔的进攻乏力',
            tip: '基尼奥内斯传射建功，墨西哥晋级',
            winProb: { home: 65.0, draw: 20.0, away: 15.0 },
            scoreProbs: ['1-0(24.2%)', '0-0(18.5%)', '2-0(15.8%)', '1-1(9.2%)', '0-1(7.0%)'],
            expectedGoals: { home: 1.31, away: 0.38 },
            predScores: ['1-0', '0-0'],
            predScores: ['1-0', '0-0'],
        }
    },
    {
        id: 8, round: '1/16决赛 · 第八场', date: '7月2日', time: '00:00', venue: '待确认',
        home: 'eng', away: 'cod', score: '-', status: 'pending', winner: null, confidence: 0,
        analysis: {
            homeAdv: '英格兰小组赛6-2克罗地亚、加纳，凯恩双响',
            awayAdv: '刚果（金）小组赛4-3乌兹别克斯坦，历史首次晋级',
            keyFactor: '刚果（金）的冲击力 vs 英格兰的战术纪律',
            tip: '英格兰整体实力更强，但刚果（金）不容小觑'',
            winProb: { home: 52.0, draw: 25.0, away: 23.0 },
            scoreProbs: ['1-0(12.5%)', '1-1(12.1%)', '2-0(9.6%)', '2-1(9.3%)', '0-0(8.1%)'],
            expectedGoals: { home: 1.54, away: 0.97 },
            predScores: ['1-0', '1-1'],
            predScores: ['1-0', '1-1'],
        }
    },
    {
        id: 9, round: '1/16决赛 · 第九场', date: '7月2日', time: '04:00', venue: '待确认',
        home: 'bel', away: 'sen', score: '-', status: 'pending', winner: null, confidence: 0,
        analysis: {
            homeAdv: '比利时小组赛6-2埃及、新西兰，卢卡库替补救主',
            awayAdv: '塞内加尔小组赛8-6伊拉克、新西兰，进攻火力凶猛',
            keyFactor: '比利时的老将经验 vs 塞内加尔的反击速度',
            tip: '比利时实力占优，丁丁有望延续好状态'',
            winProb: { home: 46.0, draw: 26.0, away: 28.0 },
            scoreProbs: ['1-1(9.4%)', '2-1(8.8%)', '1-2(7.3%)', '2-2(6.9%)', '1-0(6.0%)'],
            expectedGoals: { home: 1.89, away: 1.56 },
            predScores: ['1-1', '2-1'],
            predScores: ['1-1', '2-1'],
        }
    },
    {
        id: 10, round: '1/16决赛 · 第十场', date: '7月2日', time: '08:00', venue: '待确认',
        home: 'usa', away: 'biH', score: '-', status: 'pending', winner: null, confidence: 0,
        analysis: {
            homeAdv: '美国小组赛8-4巴拉圭、澳大利亚，巴洛贡梅开二度',
            awayAdv: '波黑小组赛5-6卡塔尔、瑞士，曼赞比传射建功',
            keyFactor: '波黑的进攻火力 vs 美国的东道主优势',
            tip: '美国有望打破淘汰赛不胜魔咒'',
            winProb: { home: 50.0, draw: 25.0, away: 25.0 },
            scoreProbs: ['2-1(9.6%)', '1-1(9.0%)', '2-0(7.5%)', '1-0(7.0%)', '3-1(6.8%)'],
            expectedGoals: { home: 2.14, away: 1.28 },
            predScores: ['1-1', '2-1'],
            predScores: ['2-1', '1-1'],
        }
    },
    {
        id: 11, round: '1/16决赛 · 第十一场', date: '7月3日', time: '03:00', venue: '待确认',
        home: 'esp', away: 'aut', score: '-', status: 'pending', winner: null, confidence: 0,
        analysis: {
            homeAdv: '西班牙小组赛5-0沙特、佛得角，亚马尔世界杯首球',
            awayAdv: '奥地利小组赛6-6约旦、阿尔及利亚，进球大战',
            keyFactor: '西班牙的中场控制 vs 奥地利的快速转换',
            tip: '西班牙实力明显占优，亚马尔有望继续发光'',
            winProb: { home: 55.0, draw: 23.0, away: 22.0 },
            scoreProbs: ['1-0(11.3%)', '1-1(11.0%)', '2-0(10.1%)', '2-1(9.8%)', '0-0(6.3%)'],
            expectedGoals: { home: 1.79, away: 0.97 },
            predScores: ['1-0', '1-1'],
            predScores: ['1-0', '1-1'],
        }
    },
    {
        id: 12, round: '1/16决赛 · 第十二场', date: '7月3日', time: '07:00', venue: '待确认',
        home: 'por', away: 'cro', score: '-', status: 'pending', winner: null, confidence: 0,
        analysis: {
            homeAdv: '葡萄牙小组赛6-1乌兹别克斯坦、刚果（金），C罗双响',
            awayAdv: '克罗地亚小组赛5-5巴拿马、英格兰，布迪米尔关键进球',
            keyFactor: '魔笛 vs C罗，两代传奇的最后世界杯',
            tip: 'C罗有望在最后的世界杯留下经典'',
            winProb: { home: 55.0, draw: 23.0, away: 22.0 },
            scoreProbs: ['1-0(11.1%)', '1-1(10.8%)', '2-0(10.2%)', '2-1(9.9%)', '3-0(6.2%)'],
            expectedGoals: { home: 1.83, away: 0.97 },
            predScores: ['1-0', '1-1'],
            predScores: ['1-0', '1-1'],
        }
    },
    {
        id: 13, round: '1/16决赛 · 第十三场', date: '7月3日', time: '11:00', venue: '待确认',
        home: 'sui', away: 'dza', score: '-', status: 'pending', winner: null, confidence: 0,
        analysis: {
            homeAdv: '瑞士小组赛7-3加拿大、波黑，曼赞比传射建功',
            awayAdv: '阿尔及利亚小组赛5-7约旦、奥地利，进球大战',
            keyFactor: '阿尔及利亚的进攻 vs 瑞士的防守反击',
            tip: '势均力敌的对决，瑞士经验略占优'',
            winProb: { home: 48.0, draw: 25.0, away: 27.0 },
            scoreProbs: ['2-1(9.8%)', '1-1(9.0%)', '2-0(8.7%)', '1-0(8.0%)', '3-1(7.1%)'],
            expectedGoals: { home: 2.18, away: 1.13 },
            predScores: ['1-1', '2-1'],
            predScores: ['2-1', '1-1'],
        }
    },
    {
        id: 14, round: '1/16决赛 · 第十四场', date: '7月4日', time: '02:00', venue: '待确认',
        home: 'aus', away: 'egy', score: '-', status: 'pending', winner: null, confidence: 0,
        analysis: {
            homeAdv: '澳大利亚小组赛2-2土耳其、巴拉圭，进攻乏力',
            awayAdv: '埃及小组赛5-3新西兰、伊朗，法老状态回升',
            keyFactor: '埃及的法老进攻线 vs 澳大利亚的身体对抗',
            tip: '势均力敌，埃及略占优势'',
            winProb: { home: 38.0, draw: 28.0, away: 34.0 },
            scoreProbs: ['0-1(16.1%)', '0-0(14.4%)', '1-1(13.2%)', '1-0(11.8%)', '0-2(9.0%)'],
            expectedGoals: { home: 0.82, away: 1.12 },
            predScores: ['0-0', '0-1'],
            predScores: ['0-1', '0-0'],
        }
    },
    {
        id: 15, round: '1/16决赛 · 第十五场', date: '7月4日', time: '06:00', venue: '待确认',
        home: 'arg', away: 'cpv', score: '-', status: 'pending', winner: null, confidence: 0,
        analysis: {
            homeAdv: '阿根廷小组赛8-1阿尔及利亚、奥地利，梅西戴帽',
            awayAdv: '佛得角小组赛2-2西班牙、沙特，创造历史黑马',
            keyFactor: '梅西的终极表演 vs 佛得角的铁桶防守',
            tip: '阿根廷实力碾压，梅西有望继续刷新纪录'',
            winProb: { home: 70.0, draw: 17.0, away: 13.0 },
            scoreProbs: ['1-0(17.7%)', '2-0(15.7%)', '0-0(9.9%)', '1-1(9.4%)', '3-0(9.3%)'],
            expectedGoals: { home: 1.78, away: 0.53 },
            predScores: ['1-0', '2-0'],
            predScores: ['1-0', '2-0'],
        }
    },
    {
        id: 16, round: '1/16决赛 · 第十六场', date: '7月4日', time: '09:30', venue: '待确认',
        home: 'col', away: 'gha', score: '-', status: 'pending', winner: null, confidence: 0,
        analysis: {
            homeAdv: '哥伦比亚小组赛4-1刚果（金）、乌兹别克斯坦，迪亚斯传射建功',
            awayAdv: '加纳小组赛2-2巴拿马、英格兰，伊伦基绝杀',
            keyFactor: '哥伦比亚的超跑进攻 vs 加纳的身体对抗',
            tip: '南美德比，哥伦比亚实力占优'',
            winProb: { home: 58.0, draw: 22.0, away: 20.0 },
            scoreProbs: ['1-0(21.6%)', '0-0(20.4%)', '1-1(11.5%)', '2-0(11.5%)', '0-1(10.8%)'],
            expectedGoals: { home: 1.06, away: 0.53 },
            predScores: ['0-0', '1-0'],
            predScores: ['1-0', '0-0'],
        }
    },
];

// 夺冠热门
const FAVORITES = [
    { name: '法国', flag: '🇫🇷', prob: 24, reason: '姆巴佩帽子戏法状态无敌，全胜晋级淘汰赛', depth: '前锋线多点开花，中场控制力强' },
    { name: '阿根廷', flag: '🇦🇷', prob: 20, reason: '梅西戴帽创世界杯历史射手王纪录，头名出线', depth: '攻防平衡，大赛经验丰富' },
    { name: '西班牙', flag: '🇪🇸', prob: 14, reason: '亚马尔世界杯首球，传控体系成熟', depth: '中场控制力世界前三' },
    { name: '葡萄牙', flag: '🇵🇹', prob: 10, reason: 'C罗双响创纪录，5-0乌兹别克斯坦大胜', depth: '中场创造力突出，边路速度快' },
    { name: '英格兰', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', prob: 9, reason: '凯恩破咒，4-2克罗地亚展现进攻火力', depth: '多条线均有英超顶级球员' },
    { name: '荷兰', flag: '🇳🇱', prob: 7, reason: '锋有力状态爆棚，5-1瑞典小组头名', depth: '高位逼抢出色，整体战术纪律严明' },
];
