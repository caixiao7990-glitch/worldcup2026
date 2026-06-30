#!/usr/bin/env python3
"""
2026世界杯数据自动更新脚本
从 https://www.xiaohongshu.com/worldcup26 抓取1/16决赛比分
更新 data.js 中的 score/status/winner/tip 字段
"""

import json
import re
import urllib.request
import ssl

def fetch_worldcup_data():
    """从小红书抓取比赛数据"""
    url = "https://www.xiaohongshu.com/worldcup26?wcup_source=26WC_ZBBlive"

    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE

    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
    }

    req = urllib.request.Request(url, headers=headers)

    try:
        with urllib.request.urlopen(req, context=ctx, timeout=10) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
    except Exception as e:
        print(f"抓取失败: {e}")
        return None

    # 提取 matches 数组
    m = re.search(r'"matches":\s*(\[.*?\])(?:\s*,\s*\"|\s*\])', html, re.DOTALL)
    if not m:
        print("未找到 matches 数据")
        return None

    matches = json.loads(m.group(1))
    r16 = [x for x in matches if x.get('match', {}).get('roundStage') == '1/16决赛']

    return r16


def parse_match(match):
    """解析单场比赛"""
    md = match.get('match', {})
    return {
        'home': md.get('homeTeamName', ''),
        'away': md.get('awayTeamName', ''),
        'home_score': md.get('homeScore', '-'),
        'away_score': md.get('awayScore', '-'),
        'status': md.get('statusDesc', ''),
        'highlight': md.get('liveInfo', {}).get('matchHighlight', ''),
        'date': match.get('dateLabel', ''),
    }


def determine_winner(match_data):
    """根据比分确定 winner"""
    hs = match_data['home_score']
    as_ = match_data['away_score']
    status = match_data['status']

    if status != '完场':
        return None

    if hs == '-':
        return None

    hs = int(hs) if isinstance(hs, (int, float)) else 0
    as_ = int(as_) if isinstance(as_, (int, float)) else 0

    if hs > as_:
        return 'home'
    elif as_ > hs:
        return 'away'
    else:
        return 'draw'  # 点球大战


def update_data_js(new_data):
    """更新 data.js"""
    with open('data.js', 'r') as f:
        content = f.read()

    updated = False

    for match_data in new_data:
        home = match_data['home']
        away = match_data['away']
        hs = match_data['home_score']
        as_ = match_data['away_score']
        status = match_data['status']
        highlight = match_data['highlight']

        # 查找对应的 match 块
        # 通过 home/away 球队名匹配
        pattern = rf"(home: '\w+', away: '\w+',\s+score: ')[^']+'(\s+status: ')[^']+'(\s+winner: ')[^']+'"

        def find_match_block(content, home_name, away_name):
            """找到对应的 match 块"""
            # 搜索 home: 'xxx', away: 'yyy' 的行
            lines = content.split('\n')
            for i, line in enumerate(lines):
                if f"home: '" in line and home_name in content[max(0,content.find(line)-200):content.find(line)+200]:
                    # 找到这段
                    pass

            # 简单方法：用正则搜索
            team_ids = {
                '南非': 'rsa', '加拿大': 'can', '巴西': 'bra', '日本': 'jpn',
                '德国': 'ger', '巴拉圭': 'par', '荷兰': 'ned', '摩洛哥': 'mor',
                '科特迪瓦': 'civ', '挪威': 'nor', '法国': 'fra', '瑞典': 'swe',
                '墨西哥': 'mex', '厄瓜多尔': 'ecu', '英格兰': 'eng', '刚果（金）': 'cod',
                '比利时': 'bel', '塞内加尔': 'sen', '美国': 'usa', '波黑': 'biH',
                '西班牙': 'esp', '奥地利': 'aut', '葡萄牙': 'por', '克罗地亚': 'cro',
                '瑞士': 'sui', '阿尔及利亚': 'dza', '澳大利亚': 'aus', '埃及': 'egy',
                '阿根廷': 'arg', '佛得角': 'cpv', '哥伦比亚': 'col', '加纳': 'gha',
            }

            home_id = team_ids.get(home_name, '')
            away_id = team_ids.get(away_name, '')

            if home_id and away_id:
                return f"home: '{home_id}', away: '{away_id}'"
            return None

        if status != '完场':
            continue

        team_ids = {
            '南非': 'rsa', '加拿大': 'can', '巴西': 'bra', '日本': 'jpn',
            '德国': 'ger', '巴拉圭': 'par', '荷兰': 'ned', '摩洛哥': 'mor',
        }

        home_id = team_ids.get(home, '')
        away_id = team_ids.get(away, '')

        if not home_id or not away_id:
            continue

        winner = determine_winner(match_data)
        score_str = f"{hs}-{as_}"

        # 构建 tip
        tip_map = {
            ('rsa', 'can'): '加拿大补时绝杀，历史淘汰赛首胜',
            ('bra', 'jpn'): '马丁内利绝杀，巴西挺进八强',
            ('ger', 'par'): '点球大战落败，德国难破淘汰赛魔咒',
            ('ned', 'mor'): '摩洛哥点球大战晋级，荷兰止步16强',
        }
        tip = tip_map.get((home_id, away_id), highlight)

        # 替换 data.js 中的对应字段
        # 找到 home: 'xxx', away: 'yyy' 的那一行
        search_pattern = rf"(home: '{home_id}', away: '{away_id}',\s+score: ')[^']+(')(\s+status: ')[^']+(')(\s+winner: ')[^']+(')"

        def replacer(m):
            nonlocal updated
            updated = True
            return f"{m.group(1)}{score_str}{m.group(2)}{m.group(3)}'finished'{m.group(4)}{m.group(5)}'{winner}'{m.group(6)}"

        content = re.sub(search_pattern, replacer, content)

        # 更新 tip
        tip_pattern = rf"(home: '{home_id}', away: '{away_id}'[^}}]*?tip: ')[^']+'"
        def tip_replacer(m):
            nonlocal updated
            updated = True
            return f"{m.group(1)}{tip}"
        content = re.sub(tip_pattern, tip_replacer, content, flags=re.DOTALL)

    if updated:
        with open('data.js', 'w') as f:
            f.write(content)
        print(f"已更新 data.js")
    else:
        print("没有发现需要更新的内容")

    return updated


if __name__ == '__main__':
    print("正在抓取世界杯数据...")
    data = fetch_worldcup_data()

    if not data:
        print("抓取失败，退出")
        exit(1)

    print(f"抓取到 {len(data)} 场比赛")

    for m in data:
        parsed = parse_match(m)
        status_icon = "✅" if parsed['status'] == '完场' else "⏳"
        print(f"  {status_icon} {parsed['home']} {parsed['home_score']}-{parsed['away_score']} {parsed['away']} | {parsed['status']} | {parsed['highlight']}")

    updated = update_data_js(data)

    if updated:
        print("\n✅ 数据已更新")
    else:
        print("\n⚠️ 没有需要更新的")
