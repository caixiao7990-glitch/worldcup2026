// ========== 页面渲染逻辑（今日+明日比赛 + 完整预测） ==========

document.addEventListener('DOMContentLoaded', () => {
    renderToday();
    renderTomorrow();
    renderTomorrowPredictions();
    renderFavorites();
});

// 获取今天的日期字符串（北京时间）
function getTodayStr() {
    const now = new Date();
    const utc = now.getTime() + (8 * 3600000);
    const beijing = new Date(utc);
    const m = beijing.getMonth() + 1;
    const d = beijing.getDate();
    return `${m}月${d}日`;
}

// 获取明天的日期字符串（北京时间）
function getTomorrowStr() {
    const now = new Date();
    const utc = now.getTime() + (8 * 3600000);
    const beijing = new Date(utc);
    beijing.setDate(beijing.getDate() + 1);
    const m = beijing.getMonth() + 1;
    const d = beijing.getDate();
    return `${m}月${d}日`;
}

// 渲染今天的比赛
function renderToday() {
    const today = getTodayStr();
    const todayMatches = MATCHUPS.filter(m => m.date === today);

    const section = document.getElementById('todaySection');
    const bracket = document.getElementById('todayBracket');

    if (todayMatches.length === 0) {
        section.style.display = 'none';
        return;
    }

    const title = section.querySelector('.section-title');
    title.innerHTML = `
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
        今日比赛（${today}）
    `;

    todayMatches.forEach((match, i) => {
        const homeTeam = TEAMS.find(t => t.id === match.home);
        const awayTeam = TEAMS.find(t => t.id === match.away);

        const card = document.createElement('div');
        card.className = 'match-card animate-in';
        card.style.animationDelay = `${i * 0.1}s`;

        let scoreHome, scoreAway, resultTag, statusBadge;
        if (match.status === 'finished') {
            scoreHome = match.score.split('-')[0];
            scoreAway = match.score.split('-')[1];
            let homeWin = false, awayWin = false;
            if (match.winner === 'home') homeWin = true;
            else if (match.winner === 'away') awayWin = true;
            else if (match.winner === 'draw') {
                homeWin = true; awayWin = true;
            }
            resultTag = {
                home: homeWin ? `<span class="result-tag win">胜</span>` : '',
                away: awayWin ? `<span class="result-tag win">胜</span>` : ''
            };
            // 点球大战标识
            if (match.winner === 'draw') {
                resultTag.home = `<span class="result-tag win">点球负</span>`;
                resultTag.away = `<span class="result-tag win">胜</span>`;
            }
            statusBadge = '<span style="color:var(--green);font-size:11px;">✅ 已结束</span>';
        } else {
            scoreHome = '-';
            scoreAway = '-';
            resultTag = '';
            statusBadge = '<span style="color:var(--gold);font-size:11px;font-weight:600;">⏳ 待开赛</span>';
        }

        card.innerHTML = `
            <div class="match-header">
                <span class="match-label">${match.round}</span>
                <span class="match-time">${match.date} ${match.time} 北京时间</span>
            </div>
            <div class="match-body">
                <div class="team-row">
                    <span class="flag">${homeTeam.flag}</span>
                    <div class="team-info">
                        <div class="name">${homeTeam.name} ${resultTag.home}</div>
                        <div class="detail">${homeTeam.conf}</div>
                    </div>
                    <span class="team-score ${match.status === 'finished' ? 'prediction' : ''}">${scoreHome}</span>
                </div>
                <div class="team-row">
                    <span class="flag">${awayTeam.flag}</span>
                    <div class="team-info">
                        <div class="name">${awayTeam.name} ${resultTag.away}</div>
                        <div class="detail">${awayTeam.conf}</div>
                    </div>
                    <span class="team-score ${match.status === 'finished' ? 'prediction' : ''}">${scoreAway}</span>
                </div>
            </div>
            <div class="match-footer">
                <div class="confidence-bar">
                    <span>状态</span>
                    <div class="confidence-track">
                        ${match.status === 'finished'
                            ? `<div class="confidence-fill" style="width: ${match.confidence}%;background:linear-gradient(90deg,var(--green),var(--gold));"></div>`
                            : `<div class="confidence-fill" style="width: 0%;background:var(--gold);opacity:0.3;"></div>`
                        }
                    </div>
                    <span>${match.status === 'finished' ? match.confidence + '%' : '待开赛'}</span>
                </div>
                <div style="text-align:center;margin-top:4px;">${statusBadge}</div>
            </div>
        `;
        bracket.appendChild(card);
    });
}

// 渲染明天的比赛
function renderTomorrow() {
    const tomorrow = getTomorrowStr();
    const tomorrowMatches = MATCHUPS.filter(m => m.date === tomorrow);

    const section = document.getElementById('tomorrowSection');
    const bracket = document.getElementById('tomorrowBracket');

    if (tomorrowMatches.length === 0) {
        section.style.display = 'none';
        return;
    }

    const title = section.querySelector('.section-title');
    title.innerHTML = `
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
        明日比赛（${tomorrow}）
    `;

    tomorrowMatches.forEach((match, i) => {
        const homeTeam = TEAMS.find(t => t.id === match.home);
        const awayTeam = TEAMS.find(t => t.id === match.away);

        const card = document.createElement('div');
        card.className = 'match-card animate-in';
        card.style.animationDelay = `${i * 0.1}s`;

        card.innerHTML = `
            <div class="match-header">
                <span class="match-label">${match.round}</span>
                <span class="match-time">${match.date} ${match.time} 北京时间</span>
            </div>
            <div class="match-body">
                <div class="team-row">
                    <span class="flag">${homeTeam.flag}</span>
                    <div class="team-info">
                        <div class="name">${homeTeam.name}</div>
                        <div class="detail">${homeTeam.conf}</div>
                    </div>
                    <span class="team-score">-</span>
                </div>
                <div class="team-row">
                    <span class="flag">${awayTeam.flag}</span>
                    <div class="team-info">
                        <div class="name">${awayTeam.name}</div>
                        <div class="detail">${awayTeam.conf}</div>
                    </div>
                    <span class="team-score">-</span>
                </div>
            </div>
            <div class="match-footer">
                <div class="confidence-bar">
                    <span>状态</span>
                    <div class="confidence-track">
                        <div class="confidence-fill" style="width: 0%;background:var(--gold);opacity:0.3;"></div>
                    </div>
                    <span>⏳ 待开赛</span>
                </div>
            </div>
        `;
        bracket.appendChild(card);
    });
}

// 渲染今天+明天比赛的详细分析预测
function renderTomorrowPredictions() {
    const today = getTodayStr();
    const tomorrow = getTomorrowStr();
    const allMatches = MATCHUPS.filter(m => m.date === today || m.date === tomorrow);

    const analysisContainer = document.getElementById('analysisCards');
    const section = document.getElementById('analysisSection');

    if (allMatches.length === 0) {
        section.style.display = 'none';
        return;
    }

    allMatches.forEach((match, i) => {
        const homeTeam = TEAMS.find(t => t.id === match.home);
        const awayTeam = TEAMS.find(t => t.id === match.away);
        const isToday = match.date === today;
        const dateLabel = isToday ? '今日' : '明日';

        const card = document.createElement('div');
        card.className = 'analysis-card animate-in';
        card.style.animationDelay = `${i * 0.08}s`;
        const homeExp = match.analysis.expectedGoals.home;
        const awayExp = match.analysis.expectedGoals.away;
        const totalExp = homeExp + awayExp;

        // 计算所有可能比分的概率（Poisson分布），取Top 5
        const scoreProbs = [];
        for (let h = 0; h <= 5; h++) {
            for (let a = 0; a <= 5; a++) {
                const ph = Math.pow(homeExp, h) * Math.exp(-homeExp) / factorial(h);
                const pa = Math.pow(awayExp, a) * Math.exp(-awayExp) / factorial(a);
                const prob = ph * pa * 100;
                scoreProbs.push({ score: `${h}-${a}`, prob: prob });
            }
        }
        scoreProbs.sort((a, b) => b.prob - a.prob);
        const top5 = scoreProbs.slice(0, 5);
        const top3Total = top5.slice(0, 3).reduce((sum, s) => sum + s.prob, 0);

        // 计算大小球概率（总进球 > 2.5）
        let over25 = 0;
        let under25 = 0;
        for (let h = 0; h <= 6; h++) {
            for (let a = 0; a <= 6; a++) {
                const total = h + a;
                const ph = Math.pow(homeExp, h) * Math.exp(-homeExp) / factorial(h);
                const pa = Math.pow(awayExp, a) * Math.exp(-awayExp) / factorial(a);
                const prob = ph * pa;
                if (total > 2.5) over25 += prob;
                else under25 += prob;
            }
        }
        over25 = round2(over25 * 100);
        under25 = round2(under25 * 100);

        // 双方进球概率
        let btts = 0;
        let no_btts = 0;
        for (let h = 1; h <= 6; h++) {
            for (let a = 1; a <= 6; a++) {
                const ph = Math.pow(homeExp, h) * Math.exp(-homeExp) / factorial(h);
                const pa = Math.pow(awayExp, a) * Math.exp(-awayExp) / factorial(a);
                btts += ph * pa;
            }
        }
        btts = round2(btts * 100);
        no_btts = round2((1 - btts) * 100);

        // 最可能总进球数
        let mostLikelyTotal = 0;
        let maxTotalProb = 0;
        for (let t = 0; t <= 8; t++) {
            let tp = 0;
            for (let h = 0; h <= t; h++) {
                const a = t - h;
                const ph = Math.pow(homeExp, h) * Math.exp(-homeExp) / factorial(h);
                const pa = Math.pow(awayExp, a) * Math.exp(-awayExp) / factorial(a);
                tp += ph * pa;
            }
            if (tp > maxTotalProb) {
                maxTotalProb = tp;
                mostLikelyTotal = t;
            }
        }

        // 最可能比分（从数据中读取）
        const predScores = match.analysis.predScores || ['-', '-'];

        // 胜负格局条可视化
        const hp = match.analysis.winProb.home;
        const dp = match.analysis.winProb.draw;
        const ap = match.analysis.winProb.away;
        const maxPct = Math.max(hp, dp, ap);
        const barWidth = (maxPct / 100) * 100;
        const barColor = hp >= ap ? 'var(--green)' : 'var(--blue)';

        card.innerHTML = `
            <div class="analysis-header" onclick="toggleCard(this)">
                <div class="analysis-matchup">
                    <span>${homeTeam.flag}</span>
                    <span class="analysis-vs">VS</span>
                    <span>${awayTeam.flag}</span>
                    <span style="font-weight:600; margin-left:8px;">${homeTeam.name} vs ${awayTeam.name}</span>
                </div>
                <div>
                    <span style="color:var(--gold);font-size:12px;margin-right:8px;">${match.date} ${match.time} 北京时间</span>
                    <span style="color:var(--text-dim);font-size:13px;margin-right:8px;">${dateLabel} · ${match.status === 'finished' ? '已结束' : '待开赛'}</span>
                    <span style="cursor:pointer;color:var(--text-dim);font-size:18px;margin-left:12px;">▼</span>
                </div>
            </div>
            <div class="analysis-body">
                <div class="analysis-content">
                    <!-- 左侧：实力对比 + 胜负格局 -->
                    <div class="analysis-left">
                        <h4 style="font-size:13px;color:var(--gold);margin-bottom:12px;font-weight:600;">📊 实力对比</h4>
                        <div class="pred-stat-row">
                            <span class="pred-stat-label">${homeTeam.flag} ${homeTeam.name}</span>
                            <span class="pred-stat-value" style="color:var(--green)">${homeTeam.strength}</span>
                        </div>
                        <div class="pred-stat-row">
                            <span class="pred-stat-label">${awayTeam.flag} ${awayTeam.name}</span>
                            <span class="pred-stat-value" style="color:var(--blue)">${awayTeam.strength}</span>
                        </div>
                        <div class="pred-stat-row">
                            <span class="pred-stat-label">比赛场地</span>
                            <span class="pred-stat-value" style="font-size:12px">${match.venue}</span>
                        </div>
                        <div class="pred-stat-row">
                            <span class="pred-stat-label">关键因素</span>
                            <span class="pred-stat-value" style="font-size:11px;text-align:right;max-width:70%">${match.analysis.keyFactor}</span>
                        </div>

                        <!-- 胜负格局 -->
                        <h4 style="font-size:13px;color:var(--gold);margin:16px 0 10px;font-weight:600;">🏆 胜负格局</h4>
                        <div class="outcome-bar">
                            <div class="outcome-segment outcome-home" style="width:${hp}%;background:var(--green)" title="${homeTeam.name} 胜 ${hp}%"></div>
                            <div class="outcome-segment outcome-draw" style="width:${dp}%;background:var(--gold)" title="平局 ${dp}%"></div>
                            <div class="outcome-segment outcome-away" style="width:${ap}%;background:var(--blue)" title="${awayTeam.name} 胜 ${ap}%"></div>
                        </div>
                        <div class="outcome-labels">
                            <span style="color:var(--green);font-size:11px;">主胜${hp}%</span>
                            <span style="color:var(--gold);font-size:11px;">平${dp}%</span>
                            <span style="color:var(--blue);font-size:11px;">客胜${ap}%</span>
                        </div>
                    </div>

                    <!-- 右侧：精准比分预测 -->
                    <div class="analysis-right">
                        <h4 style="font-size:13px;color:var(--gold);margin-bottom:12px;font-weight:600;">⚽ 预测比分</h4>
                        <p style="font-size:11px;color:var(--text-dim);margin-bottom:12px;">基于 Poisson 分布模型 · 总进球期望 ${totalExp.toFixed(1)} 球</p>

                        <!-- 两大比分预测 -->
                        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px;">
                            <div class="pred-score-box primary">
                                <span style="font-size:10px;color:var(--text-dim);">最可能比分</span>
                                <span style="font-size:32px;font-weight:900;color:var(--gold);margin:4px 0;">${predScores[0]}</span>
                                <span style="font-size:10px;color:var(--text-dim);">置信 ${top5[0]?.prob.toFixed(1) || '-' }%</span>
                            </div>
                            <div class="pred-score-box secondary">
                                <span style="font-size:10px;color:var(--text-dim);">次可能比分</span>
                                <span style="font-size:32px;font-weight:900;color:var(--text);margin:4px 0;">${predScores[1]}</span>
                                <span style="font-size:10px;color:var(--text-dim);">置信 ${top5[1]?.prob.toFixed(1) || '-' }%</span>
                            </div>
                        </div>

                        <!-- 比分概率条 -->
                        <div style="margin-bottom:14px;">
                            <div style="font-size:11px;color:var(--text-dim);margin-bottom:6px;">各比分概率分布</div>
                            <div class="score-bars">
                                ${top5.map(s => `
                                    <div class="score-bar-row">
                                        <span class="score-bar-label">${s.score}</span>
                                        <div class="score-bar-track">
                                            <div class="score-bar-fill" style="width:${s.prob / top5[0].prob * 100}%;"></div>
                                        </div>
                                        <span class="score-bar-pct">${s.prob.toFixed(1)}%</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <!-- 最可能总进球 -->
                        <div style="margin-top:12px;padding:8px 12px;background:rgba(245,158,11,.06);border:1px solid rgba(245,158,11,.15);border-radius:6px;text-align:center;">
                            <span style="font-size:11px;color:var(--text-dim);">最可能总进球数</span>
                            <span style="font-size:20px;font-weight:800;color:var(--gold);margin:0 4px;">${mostLikelyTotal}</span>
                            <span style="font-size:11px;color:var(--text-dim);">球 (${round2(maxTotalProb*100)}%)</span>
                        </div>

                        <!-- 大小球 -->
                        <div class="odds-row" style="margin-top:10px;">
                            <div class="odds-half over" style="background:rgba(16,185,129,.08);">
                                <span style="font-size:10px;color:var(--text-dim);">大于2.5球</span>
                                <span style="font-size:16px;font-weight:700;color:var(--green);">${over25}%</span>
                            </div>
                            <div class="odds-half under" style="background:rgba(239,68,68,.08);">
                                <span style="font-size:10px;color:var(--text-dim);">小于2.5球</span>
                                <span style="font-size:16px;font-weight:700;color:var(--red);">${under25}%</span>
                            </div>
                        </div>

                        <!-- 双方进球 -->
                        <div class="odds-row" style="margin-top:6px;">
                            <div class="odds-half btts-yes" style="background:rgba(139,92,246,.08);">
                                <span style="font-size:10px;color:var(--text-dim);">双方进球</span>
                                <span style="font-size:14px;font-weight:700;color:var(--purple);">是 ${btts}%</span>
                            </div>
                            <div class="odds-half btts-no" style="background:rgba(100,116,139,.08);">
                                <span style="font-size:10px;color:var(--text-dim);">双方进球</span>
                                <span style="font-size:14px;font-weight:700;color:var(--text-dim);">否 ${no_btts}%</span>
                            </div>
                        </div>

                        <!-- 期望进球 -->
                        <div style="margin-top:10px;display:flex;justify-content:space-between;align-items:center;padding:6px 0;">
                            <div style="text-align:center;">
                                <div style="font-size:18px;font-weight:800;color:var(--green)">${homeExp.toFixed(1)}</div>
                                <div style="font-size:10px;color:var(--text-dim)">${homeTeam.name}</div>
                            </div>
                            <div style="font-size:11px;color:var(--text-dim)">期望进球</div>
                            <div style="text-align:center;">
                                <div style="font-size:18px;font-weight:800;color:var(--blue)">${awayExp.toFixed(1)}</div>
                                <div style="font-size:10px;color:var(--text-dim)">${awayTeam.name}</div>
                            </div>
                        </div>

                        ${match.analysis.upsetScore ? `
                        <!-- 爆冷预测 -->
                        <div style="margin-top:10px;padding:8px 12px;background:rgba(239,68,68,.06);border:1px solid rgba(239,68,68,.2);border-radius:6px;text-align:center;">
                            <span style="font-size:10px;color:var(--red);">🌶️ 爆冷预测</span>
                            <span style="font-size:20px;font-weight:900;color:var(--red);margin:0 4px;">${match.analysis.upsetScore}</span>
                        </div>
                        ` : ''}

                        <!-- 分析 -->
                        <p style="font-size:12px;color:var(--text-muted);line-height:1.6;margin-top:12px;padding-top:10px;border-top:1px solid var(--border);">
                            💡 <strong style="color:var(--gold)">分析：</strong>${match.analysis.tip}
                        </p>
                    </div>
                </div>
            </div>
        `;
        analysisContainer.appendChild(card);
    });
}

// 渲染夺冠热门
function renderFavorites() {
    const container = document.getElementById('favoritesGrid');
    FAVORITES.forEach((fav, i) => {
        const team = TEAMS.find(t => t.name === fav.name) ||
                     { flag: '🏅', name: fav.name };
        const color = i === 0 ? 'var(--gold)' : i < 3 ? 'var(--green)' : 'var(--blue)';

        const card = document.createElement('div');
        card.className = `favorite-card ${i === 0 ? 'top-pick' : ''} animate-in`;
        card.style.animationDelay = `${i * 0.1}s`;
        card.innerHTML = `
            <div class="favorite-rank">#${i + 1}</div>
            <span class="favorite-flag">${team.flag}</span>
            <div class="favorite-name">${team.name}</div>
            <div class="favorite-detail">${fav.reason}</div>
            <div class="probability-bar">
                <div class="probability-fill" style="width:${fav.prob * 4}%;background:${color}"></div>
            </div>
            <div class="prob-text">夺冠概率 ${fav.prob}% · ${fav.depth}</div>
        `;
        container.appendChild(card);
    });
}

// 展开/折叠分析卡片
function toggleCard(header) {
    const card = header.closest('.analysis-card');
    card.classList.toggle('expanded');
}

// 阶乘辅助函数
function factorial(n) {
    if (n <= 1) return 1;
    let r = 1;
    for (let i = 2; i <= n; i++) r *= i;
    return r;
}

// 保留两位小数
function round2(v) {
    return Math.round(v * 100) / 100;
}
