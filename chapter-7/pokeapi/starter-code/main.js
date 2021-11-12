/**
 * Let's use the `class` structure! It's pretty similar to what you've probably seen in other languages. Classes are new to ES6, by the way.
 */

class Poke {
  constructor() {
    /**
     * Use the constructor as you would in other languages: Set up your instance variables and globals
     */
    this.loader = document.getElementById('loader')
    this.choosenPokemon = {}
    this.Player1 = {}
    this.Player2 = {}
    document.addEventListener("click", e => {
      if (e.target.classList.contains('go')) {
        const parent = e.target.parentNode;
        this.choosePokemon(parent.querySelector('.pokeSelector').value, parent)
      }
    })
  }

  getPokemon() {
    /**
     * First, we need to get all of our Pokémon so that we can add them to tthe <select> list in order to choose them.
     * Hint: The URL you can use to get all of them in the API without pagination is: https://pokeapi.co/api/v2/pokemon?limit=1000
     * You'll probably want to do something with the loader div as well.
     */
    fetch("https://pokeapi.co/api/v2/pokemon?limit=1000").then(response => response.json()).then(data => {
      const pokeSelector = document.querySelector('.pokeSelector.main');
      data.results.forEach(poke => {
        const option = document.createElement('option');
        option.textContent = poke.name;
        option.value = poke.url;
        pokeSelector.appendChild(option);
      })
      const cloneSelector = pokeSelector.cloneNode(true);
      document.querySelector('.pokeSelector.clone').replaceWith(cloneSelector);
      this.toggleLoader()
      document.querySelectorAll('.player').forEach(player => player.style.visibility = 'visible')
    })
  }

  choosePokemon(url, parent) {
    /**
     * Next, we want to enable the player to select a pokémon.
     * After retrieving the information from the API, peruse the response data. You'll see quite a lot of information.
     * To help you sift through the data for the each pokémon's basic moves, I've left you the below code.
     * Look up the Array.filter method here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
     */
    this.toggleLoader()
    fetch(url).then(response => response.json()).then(data => {
      this.toggleLoader()
      const moves = data.moves.filter((move) => {
        const mymoves = move.version_group_details.filter((level) => {
          return level.level_learned_at === 1
        })
        return mymoves.length > 0
      })
      this.choosenPokemon[parent.id] = data
      this.populateCard(data, parent, moves)
    })
  }

  populateCard(data, root, moves) {
    /**
     * Be sure you're keeping track of the player! That's where this function's `root` comes into play.
     * Now that you've passed the pokémon's data to this function, build out the card to display its stats.
     * Reference the HTML and CSS to be sure you have the right pieces.
     */
    const card = root.querySelector('.card');
    card.querySelector('h3').textContent = data.name;
    card.querySelector('img').src = data.sprites.front_default;
    document.addEventListener('hp', e => {
      if (e.detail.player === root.id) {
        card.querySelector('.hp').textContent = e.detail.hp
      }
    })
    card.querySelectorAll('button[class^="move"]').forEach((btn, i) => {
      btn.textContent = moves[i].move.name
      btn.dataset.url = moves[i].move.url
    })
    card.addEventListener('click', e => {
      if (e.target.tagName.toLowerCase() === 'button') {
        this.doMove(e.target.dataset.url, root.id)
      }
    })

    this.hp = {
      player: root.id,
      hp: data.stats[5].base_stat
    }
    card.style.visibility = 'visible';
  }

  set hp(event) {
    /**
     * This is an example of a setter in a JavaScript class. I'll leave it here for you in its entirety to dissect.
     */
    if (event.hp) {
      this[event.player].hp = event.hp
    }

    if (event.damage) {
      this[event.player].hp -= event.damage
    }
    const e = new CustomEvent("hp", {
      detail: {
        player: event.player,
        hp: this[event.player].hp
      }
    })
    document.dispatchEvent(e)
  }

  doMove(url, player) {
    /**
     *  How would we play a move against the other player?
     */
    const enemy = player === 'Player1' ? 'Player2' : 'Player1'
    fetch(url).then(response => response.json()).then(data => {
      if (data.power){
        const damage = Math.floor(Math.random() * data.power)
        this.hp = {
          player: enemy,
          damage
        }
        if (this[enemy].hp <= 0) {
          this.declareWinner(enemy)
        } else {
          this.doResult("It's effective!", true)
        }
      } else {
        this.doResult("It's not very effective...", true)
      }
    })
  }

  declareWinner(player) {
    this.doResult(`${player}'s Pokémon has fainted!`)
  }

  doResult(data, fade = false) {
    /**
     * As this is visual logic, here's the complete code for this function
     */
    const result = document.querySelector('#result')
    result.querySelector('h2').innerHTML = data
    result.style.visibility = 'visible'
    result.style.opacity = 1

    if (fade === true) {
      setTimeout(() => {
        let fadeEffect = setInterval(() => {
          if (!result.style.opacity) {
            result.style.opacity = 1;
          }
          if (result.style.opacity > 0) {
            result.style.opacity -= 0.1;
          } else {
            clearInterval(fadeEffect);

            result.style.visibility = 'hidden'
          }
        }, 100)
      }, 1000)
    }

  }

  toggleLoader() {
    /**
     * As this is visual logic, here's the complete code for this function
     */
    if (this.loader.style.visibility === 'visible' || this.loader.style.visibility === '') {
      this.loader.style.visibility = 'hidden'
    } else {
      this.loader.style.visibility = 'visible'
    }
  }
}

// Here is how we create an instance of our claass and give it life by invoking a method.
const p = new Poke().getPokemon()