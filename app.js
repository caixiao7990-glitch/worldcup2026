// ========== 页面渲染逻辑（日期选择器） ==========

document.addEventListener('DOMContentLoaded', () => {
    renderDateSelector();
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

// 获取明天日期
function getTomorrowStr() {
    const now = new Date();
    const utc = now.getTime() + (8 * 3600000);
    const beijing = new Date(utc);
    beijing.setDate(beijing.getDate() + 1);
    const m = beijing.getMonth() + 1;
    const d = beijing.getDate();
    return `${m}月${d}日`;
}

// 获取所有有比赛的日期
function getAllDates() {
    const dates = [...new Set(MATCHUPS.map(m => m.date))];
    return dates;
}

// 渲染日期选择器
function renderDateSelector() {
    const selector = document.getElementById('dateSelector');
    const today = getTodayStr();
    const dates = getAllDates();

    dates.forEach((date, i) => {
        const btn = document.createElement('button');
        btn.className = `date-btn${date === today ? ' active' : ''}`;
        btn.textContent = date;
        btn.onclick = () => selectDate(date);
        selector.appendChild(btn);
    });
}

// 选择日期
function selectDate(date) {
    // 更新按钮状态
    document.querySelectorAll('.date-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent === date);
    });

    // 获取该日期的比赛
    const dayMatches = MATCHUPS.filter(m => m.date === date);
    if (dayMatches.length === 0) return;

    // 显示比赛区域
    const matchSection = document.getElementById('matchSection');
    const analysisSection = document.getElementById('analysisSection');
    matchSection.style.display = '';
    analysisSection.style.display = '';

    // 更新标题
    document.getElementById('matchDateLabel').textContent = `${date} 比赛`;

    // 渲染比赛卡片
    const bracket = document.getElementById('matchBracket');
    bracket.innerHTML = '';

    dayMatches.forEach((match, i) => {
        const homeTeam = TEAMS.find(t => t.id === match.home);
        const awayTeam = TEAMS.find(t => t.id === match.away);

        const card = document.createElement('div');
        card.className = 'match-card animate-in';
        card.style.animationDelay = `${i * 0.1}s`;

        let scoreHome, scoreAway, resultTag, statusBadge;
        if (match.status === 'finished') {
            scoreHome = match.score.split('-')[0];
            scoreAway = match.score.split('-')[1];
            resultTag = `<span class="result-tag win">胜</span>`;
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
                        <div class="name">${homeTeam.name} ${resultTag}</div>
                        <div class="detail">${homeTeam.conf}</div>
                    </div>
                    <span class="team-score ${match.status === 'finished' ? 'prediction' : ''}">${scoreHome}</span>
                </div>
                <div class="team-row">
                    <span class="flag">${awayTeam.flag}</span>
                    <div class="team-info">
                        <div class="name">${awayTeam.name}</div>
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

    // 渲染分析卡片
    const analysisContainer = document.getElementById('analysisCards');
    analysisContainer.innerHTML = '';

    dayMatches.forEach((match, i) => {
        const homeTeam = TEAMS.find(t => t.id === match.home);
        const awayTeam = TEAMS.find(t => t.id === match.away);

        const card = document.createElement('div');
        card.className = 'analysis-card animate-in';
        card.style.animationDelay = `${i * 0.08}s`;

        // Poisson 计算
        const homeExp = match.analysis.expectedGoals.home;
        const awayExp = match.analysis.expectedGoals.away;
        const totalExp = homeExp + awayExp;

        const scoreProbs = [];
        for (let h = 0; h <= 5; h++) {
            for (let a = 0; a <= 5; a++) {
                const ph = Math.pow(homeExp, h) * Math.exp(-homeExp) / factorial(h);
                const pa = Math.pow(awayExp, a) * Math.exp(-awayExp) / factorial(a);
                scoreProbs.push({ score: `${h}-${a}`, prob: ph * pa * 100 });
            }
        }
        scoreProbs.sort((a, b) => b.prob - a.prob);
        const top5 = scoreProbs.slice(0, 5);

        // 大小球
        let over25 = 0, under25 = 0;
        for (let h = 0; h <= 6; h++) {
            for (let a = 0; a <= 6; a++) {
                const ph = Math.pow(homeExp, h) * Math.exp(-homeExp) / factorial(h);
                const pa = Math.pow(awayExp, a) * Math.exp(-awayExp) / factorial(a);
                if (h + a > 2.5) over25 += ph * pa;
                else under25 += ph * pa;
            }
        }

        // BTTS
        let btts = 0;
        for (let h = 1; h <= 6; h++) {
            for (let a = 1; a <= 6; a++) {
                const ph = Math.pow(homeExp, h) * Math.exp(-homeExp) / factorial(h);
                const pa = Math.pow(awayExp, a) * Math.exp(-awayExp) / factorial(a);
                btts += ph * pa;
            }
        }

        // 最可能总进球
        let mostLikelyTotal = 0, maxTotalProb = 0;
        for (let t = 0; t <= 8; t++) {
            let tp = 0;
            for (let h = 0; h <= t; h++) {
                const a = t - h;
                const ph = Math.pow(homeExp, h) * Math.exp(-homeExp) / factorial(h);
                const pa = Math.pow(awayExp, a) * Math.exp(-awayExp) / factorial(a);
                tp += ph * pa;
            }
            if (tp > maxTotalProb) { maxTotalProb = tp; mostLikelyTotal = t; }
        }

        const statusLabel = match.status === 'finished' ? '✅ 已结束' : '⏳ 待开赛';

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
                    <span style="color:var(--text-dim);font-size:13px;margin-right:8px;">${statusLabel}</span>
                    <span style="cursor:pointer;color:var(--text-dim);font-size:18px;margin-left:12px;">▼</span>
                </div>
            </div>
            <div class="analysis-body">
                <div class="analysis-content">
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

                        <h4 style="font-size:13px;color:var(--gold);margin:16px 0 10px;font-weight:600;">🏆 胜负格局</h4>
                        <div class="outcome-bar">
                            <div class="outcome-segment outcome-home" style="width:${match.analysis.winProb.home}%;background:var(--green)"></div>
                            <div class="outcome-segment outcome-draw" style="width:${match.analysis.winProb.draw}%;background:var(--gold)"></div>
                            <div class="outcome-segment outcome-away" style="width:${match.analysis.winProb.away}%;background:var(--blue)"></div>
                        </div>
                        <div class="outcome-labels">
                            <span style="color:var(--green);font-size:11px;">主胜${match.analysis.winProb.home}%</span>
                            <span style="color:var(--gold);font-size:11px;">平${match.analysis.winProb.draw}%</span>
                            <span style="color:var(--blue);font-size:11px;">客胜${match.analysis.winProb.away}%</span>
                        </div>
                    </div>

                    <div class="analysis-right">
                        <h4 style="font-size:13px;color:var(--gold);margin-bottom:12px;font-weight:600;">⚽ 预测比分</h4>
                        <p style="font-size:11px;color:var(--text-dim);margin-bottom:12px;">基于 Poisson 分布模型 · 总进球期望 ${totalExp.toFixed(1)} 球</p>

                        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px;">
                            <div class="pred-score-box primary">
                                <span style="font-size:10px;color:var(--text-dim);">最可能比分</span>
                                <span style="font-size:32px;font-weight:900;color:var(--gold);margin:4px 0;">${match.analysis.predScores[0]}</span>
                                <span style="font-size:10px;color:var(--text-dim);">置信 ${top5[0]?.prob.toFixed(1) || '-'}%</span>
                            </div>
                            <div class="pred-score-box secondary">
                                <span style="font-size:10px;color:var(--text-dim);">次可能比分</span>
                                <span style="font-size:32px;font-weight:900;color:var(--text);margin:4px 0;">${match.analysis.predScores[1]}</span>
                                <span style="font-size:10px;color:var(--text-dim);">置信 ${top5[1]?.prob.toFixed(1) || '-'}%</span>
                            </div>
                        </div>

                        <div style="margin-bottom:14px;">
                            <div style="font-size:11px;color:var(--text-dim);margin-bottom:6px;">各比分概率分布</div>
                            <div class="score-bars">
                                ${top5.map(s => `
                                    <div class="score-bar-row">
                                        <span class="score-bar-label">${s.score}</span>
                                        <div class="score-bar-track">
                                            <div class="score-bar-fill" style="width:${s.prob / top5[0].prob * 100}%"></div>
                                        </div>
                                        <span class="score-bar-pct">${s.prob.toFixed(1)}%</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <div style="margin-top:10px;padding:8px 12px;background:rgba(245,158,11,.06);border:1px solid rgba(245,158,11,.15);border-radius:6px;text-align:center;">
                            <span style="font-size:11px;color:var(--text-dim);">最可能总进球数</span>
                            <span style="font-size:20px;font-weight:800;color:var(--gold);margin:0 4px;">${mostLikelyTotal}</span>
                            <span style="font-size:11px;color:var(--text-dim);">球 (${(maxTotalProb*100).toFixed(1)}%)</span>
                        </div>

                        <div class="odds-row" style="margin-top:10px;">
                            <div class="odds-half over" style="background:rgba(16,185,129,.08);">
                                <span style="font-size:10px;color:var(--text-dim);">大于2.5球</span>
                                <span style="font-size:16px;font-weight:700;color:var(--green);">${(over25*100).toFixed(1)}%</span>
                            </div>
                            <div class="odds-half under" style="background:rgba(239,68,68,.08);">
                                <span style="font-size:10px;color:var(--text-dim);">小于2.5球</span>
                                <span style="font-size:16px;font-weight:700;color:var(--red);">${(under25*100).toFixed(1)}%</span>
                            </div>
                        </div>

                        <div class="odds-row" style="margin-top:6px;">
                            <div class="odds-half btts-yes" style="background:rgba(139,92,246,.08);">
                                <span style="font-size:10px;color:var(--text-dim);">双方进球</span>
                                <span style="font-size:14px;font-weight:700;color:var(--purple);">是 ${(btts*100).toFixed(1)}%</span>
                            </div>
                            <div class="odds-half btts-no" style="background:rgba(100,116,139,.08);">
                                <span style="font-size:10px;color:var(--text-dim);">双方进球</span>
                                <span style="font-size:14px;font-weight:700;color:var(--text-dim);">否 ${((1-btts)*100).toFixed(1)}%</span>
                            </div>
                        </div>

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
                        <div style="margin-top:10px;padding:8px 12px;background:rgba(239,68,68,.06);border:1px solid rgba(239,68,68,.2);border-radius:6px;text-align:center;">
                            <span style="font-size:10px;color:var(--red);">🌶️ 爆冷预测</span>
                            <span style="font-size:20px;font-weight:900;color:var(--red);margin:0 4px;">${match.analysis.upsetScore}</span>
                        </div>
                        ` : ''}

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
        const team = TEAMS.find(t => t.name === fav.name) || { flag: '🏅', name: fav.name };
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

// 阶乘
function factorial(n) {
    if (n <= 1) return 1;
    let r = 1;
    for (let i = 2; i <= n; i++) r *= i;
    return r;
}
