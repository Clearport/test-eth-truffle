App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    // Update this to load the available certs (uses external api, not smart contract)
    // noted elsewhere when contract is used vs normal web api.   
    /**$.getJSON('../pets.json', function(data) {
      var petsRow = $('#petsRow');
      var petTemplate = $('#petTemplate');

      for (i = 0; i < data.length; i ++) {
        petTemplate.find('.panel-title').text(data[i].name);
        petTemplate.find('img').attr('src', data[i].picture);
        petTemplate.find('.pet-breed').text(data[i].breed);
        petTemplate.find('.pet-age').text(data[i].age);
        petTemplate.find('.pet-location').text(data[i].location);
        petTemplate.find('.btn-adopt').attr('data-id', data[i].id);

        petsRow.append(petTemplate.html());
      }
    });*/

    return App.initWeb3();
  },

  initWeb3: function() {
    //Is there an injected web3 instance?
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
    } else {
      // If no injected web3 instance is detected, fall back to Ganache
        App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
      $.getJSON('UnrevokedSigned.json', function(data) {
          // Get the necessary contract artifact file and instantiate it with truffle-contract
          var UnrevokedSignedArtifact = data;
          App.contracts.UnrevokedSigned = TruffleContract(UnrevokedSignedArtifact);

          // Set the provider for our contract
          App.contracts.UnrevokedSigned.setProvider(App.web3Provider);

          // Use our contract to retrieve and mark the adopted pets
          //
          return App.markAdopted();
      });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
  },

  // certs available for a logged in account (uses web service not contract)
  retrieveAvailableCerts: function(account) {

  },
  // visual indication of accepted (uses contract, uPort id)
  markAccepted: function(account) {

  },

  // accept a cert using your logged in account info (uses contract, uPort id)
  handleAcceptCert: function(account, certData) {

  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
