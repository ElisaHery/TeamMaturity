import React from "react";
import { Link } from "react-router-dom";

import Button from "../Button/Button";

class Dialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    this.setState({ value: event.target.value });
    // event.preventDefault();

    const currentId = sessionStorage.getItem("id_ft");
    const campaign_infos = { nom_campagne: this.state.value, id_ft: currentId };
    const fetch_param = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(campaign_infos)
    };

    fetch("/api/campaign-name", fetch_param)
      .then(function(results) {
        return results.json();
      })
      .then(function(myresults) {});

    sessionStorage.setItem("currentCampaignName", this.state.value);

    // fetch(`/api/campaign_id/${this.state.value}/${this.currentId}`)
    //   .then(function(results) {
    //     return results.json();
    //   })
    //   .then(function(myresults) {});
  }

  render() {
    return (
      <div className="mask">
        <div className="popup">
          <form onSubmit={this.handleSubmit}>
            {/* <i className="fas fa-times" onClick={this.props.toggleDialog} /> */}
            <span>Donnez un nom à votre campagne</span>
            <input
              value={this.state.value}
              onChange={this.handleChange}
              type="text"
              placeholder="Nom de la campagne"
            />
            <Link to="/themes">
              <Button
                textButton="Valider"
                // onClick={this.props.toggleDialog}
                onClick={this.handleSubmit}
              />
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

export default Dialog;
