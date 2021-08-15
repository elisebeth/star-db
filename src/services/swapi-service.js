// import { startsWith } from 'core-js/core/string';

export default class SwapiService {
  _apiBase = 'https://swapi.dev/api/';

  _imageBase = 'https://starwars-visualguide.com/assets/img/';

  async getData(url) {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`could not fetch ${url}, received ${res.status}`)
    }
    const data = await res.json();

    return data;
  }

  getAllPeople = async () => {
    const data = await this.getData(`people/`);
    return data.results.map(this._transformPerson);
  }

  getPerson = async (id) => {
    const person = await this.getData(`people/${id}/`);
    return this._transformPerson(person);
  }

  getAllPlanets = async () => {
    const data = await this.getData(`planets/`);
    return data.results.map(this._transformPlanet);
  }

  getPlanet = async (id) => {
    const planet = await this.getData(`planets/${id}/`);
    return this._transformPlanet(planet);
  }

  getAllStarships = async () => {
    const data = await this.getData(`starships/`);
    return data.results.map(this._transformStarship);
  }

  getStarship = async (id) => {
    const starship = await this.getData(`starships/${id}/`);
    return this._transformStarship(starship);
  }

  getPersonImage = ({ id }) => {
    return `${this._imageBase}characters/${id}.jpg`;
  };

  getStarshipImage = ({ id }) => {
    return `${this._imageBase}starships/${id}.jpg`;
  };

  getPlanetImage = ({ id }) => {
    return `${this._imageBase}planets/${id}.jpg`;
  };

  _exctractId = (item) => {
    const idRegex = item.url.match(/\/([0-9]*)\/$/);
    const id = idRegex[1];
    return id;
  }

  _transformStarship = (starship) => {
    return {
      id: this._exctractId(starship),
      name: starship.name,
      model: starship.model,
      cost: starship.cost_in_credits,
      length: starship.length,
      crew: starship.crew,
      manufacturer: starship.manufacturer,
      passengers: starship.passengers,
      cargoCapacity: starship.cargo_capacity
    }
  };

  _transformPerson = (person) => {
    return {
      id: this._exctractId(person),
      name: person.name,
      height: person.height,
      mass: person.mass,
      hairColor: person.hair_color,
      eyeColor: person.eye_color,
      birthYear: person.birth_year,
      gender: person.gender
    }
  };

  _transformPlanet = (planet) => {
    return {
      id: this._exctractId(planet),
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter
    }
  };
}
