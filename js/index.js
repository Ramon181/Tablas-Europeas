const link = "https://web-production-ac6d.up.railway.app/positions"

const createTabla = (data, leagueFilter) => {
    const tBody = document.getElementById("tbody");

    tBody.innerHTML = "";

    const filteredData = data.filter((position) => position.league_name === leagueFilter);

    filteredData.forEach((position) => {
        const { teams } = position;

        teams.forEach((team) => {
            const { position, team_name, matches_played, games_won, games_drawn, games_lost, goals_for, goals_against, points } = team;

            const teamRow = document.createElement("tr");

            const positionCell = document.createElement("td");
            positionCell.textContent = position;
            teamRow.appendChild(positionCell);

            const teamNameCell = document.createElement("td");
            teamNameCell.textContent = team_name;
            teamRow.appendChild(teamNameCell);

            const matchesPlayedCell = document.createElement("td");
            matchesPlayedCell.textContent = matches_played;
            teamRow.appendChild(matchesPlayedCell);

            const gamesWonCell = document.createElement("td");
            gamesWonCell.textContent = games_won;
            teamRow.appendChild(gamesWonCell);

            const gamesMatchesCell = document.createElement("td");
            gamesMatchesCell.textContent = games_drawn;
            teamRow.appendChild(gamesMatchesCell);

            const lostGamesCell = document.createElement("td");
            lostGamesCell.textContent = games_lost;
            teamRow.appendChild(lostGamesCell);

            const goalsInFavorCell = document.createElement("td");
            goalsInFavorCell.textContent = goals_for;
            teamRow.appendChild(goalsInFavorCell);

            const goalsAgainstCell = document.createElement("td");
            goalsAgainstCell.textContent = goals_against;
            teamRow.appendChild(goalsAgainstCell);

            const goalsAberageCell = document.createElement("td");
            goalsAberageCell.textContent = goals_for - goals_against;
            teamRow.appendChild(goalsAberageCell);

            const pointsCell = document.createElement("td");
            pointsCell.textContent = points;
            teamRow.appendChild(pointsCell);

            tBody.appendChild(teamRow);
        });


    })
}

const data = (leagueFilter) => {
    fetch(link)
        .then(res => res.json())
        .then(data => {
            createTabla(data, leagueFilter)
        })
        .catch(error => {
            console.error('Error:', error);
        })
}

document.addEventListener('DOMContentLoaded', () => {
    const navMenu = document.querySelector('.navMenu');
    const defaultLink = navMenu.querySelector('.selected');
    navMenu.querySelectorAll('a').forEach(link => {
        link.classList.remove('selected');
    });
    defaultLink.classList.add('selected');
    const leagueFilter = defaultLink.dataset.filter;
    if (leagueFilter) {
        data(leagueFilter);
    } else {
        data('Premier League');
    }
});


const navMenu = document.querySelector(".navMenu");

navMenu.addEventListener('click', (event) => {
    event.preventDefault();
    const leagueFilter = event.target.dataset.filter;

    if (leagueFilter) {
        data(leagueFilter);
    } else {
        data('Premier League');
    }
});

