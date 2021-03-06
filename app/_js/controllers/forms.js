window.components = window.components || {};
window.components.forms = function (doc, win) {
  /**
   * Retrieves form data from Action Network API, then submits entry
   * @param {object} doc - Document object
   * @param {object} win - Window object
   * */
  "use strict";

  var
    body = doc.getElementsByTagName('body')[0],
    submitButton = body.querySelector('[type="submit"]'),
    submitted = $c('div'),
    countryLabel = doc.querySelector('[for="select-country"]'),
    countrySelect = doc.getElementById('select-country'),
    countryInput = doc.getElementById('hidden-country'),
    commitmentForm = doc.forms[0];

  submitted.classList.add('submitted');
  submitted.innerHTML = '<h2>Hang on a tick&hellip;</h2><h3>&hellip;reticulating splines.</h3><div class="circle-spinner">&nbsp;</div> '

  function updateZIPPlaceholder() {
    /**
     * Updates placeholder on ZIP/Post Code field to be appropriate for country
     * selected
     * */
    var
      ZIPLabel = doc.getElementById('form-zip_code');

    if (countrySelect.value !== 'US') {
      ZIPLabel.setAttribute('placeholder', 'Post code');
    } else {
      ZIPLabel.setAttribute('placeholder', 'ZIP');
    }
  }

  function toggleCountryField() {
    /**
     * Hides the label and shows the select when someone changes their signature
     * country.
     * */

    countryInput.remove();
    countrySelect.setAttribute('name', 'answer[country]');
    countrySelect.classList.add('visible');
    countryLabel.classList.add('hidden');
  }

  function handleSigningError(e) {
    /**
     * Figures out what to say at just the right moment
     * @param {event|XMLHttpRequest} e - Might be an event, might be a response
     * from an XMLHttpRequest
     * */

    var
      errorMessageContainer = $c('div'),
      errorMessage = $c('h2'),
      errorMessageInfo = $c('p');

    commitmentForm.removeAttribute('disabled');
    submitted.remove();
    errorMessage.textContent = 'Something went wrong';
    if (e.type) {
      errorMessageInfo.textContent = 'There seems to be a problem somewhere in between your computer and our server. Might not be a bad idea to give it another try.';
    } else if (e.status) {
      errorMessageInfo.textContent = '(the nerdy info is that the server returned a status of "' + e.status + '" and said "' + e.statusText + '".)'
    } else {
      errorMessageInfo.textContent = 'this seems to be a weird error. the nerds have been alerted.';
    }

    errorMessageContainer.appendChild(errorMessage);
    errorMessageContainer.appendChild(errorMessageInfo);
    /*
    new win.controllers.modals.PlainModalController({
      modal_content: errorMessageContainer
    });
    */
    alert(errorMessageInfo.textContent); // JL HACK ~ lol

    submitted.remove();
    submitButton.removeAttribute('disabled');
  }

  function handleSigningSuccess() {
    /**
     * Figures out what to say at just the right moment
     * @param {event|XMLHttpRequest} e - Might be an event, might be a response
     * from an XMLHttpRequest
     * */

    var
      modalContent = $c('div');

    /*
    modalContent.innerHTML = '<h2>Thanks for signing</h2>\n<p>Now, share this page to spread the word.</p>\n<p><small>…or, <a href="https://donate.fightforthefuture.org/?amount=5&frequency=just-once">chip in $5</a> to help us spread the message.</small></p>';
    modalContent.appendChild(doc.getElementById('share-modal'));

    new win.controllers.modals.PlainModalController({
      modal_content: modalContent
    });
    */
  }

  function submitForm(event) {
    /**
     * Submits the form to ActionNetwork. If the script doesn’t, by now, know
     * the action_network identifier, default isn’t prevented on the event and
     * form submission proceeds as normal.
     * @param {event} event - Form submission event
     * */

    event.preventDefault();

    var
      commitmentStatus = new XMLHttpRequest();

    commitmentForm.setAttribute('disabled', true);
    submitted.classList.add('submitted');
    submitButton.setAttribute('disabled', true);
    commitmentForm.appendChild(submitted);

    function compilePayload() {
      /**
       * Compiles the form data into a JSON payload for Ajax submission
       * @return {object} petitionFormData - just the info the API needs
       * */

      var
        petitionFormData = {
          identifier: '86ef7be3-da62-480c-ab42-4643c0f93be8',
          website: win.location.origin,
          tags: JSON.parse(doc.querySelector('[name="subscription[tag_list]"]').value),
          noOptIn: false,
          name: doc.getElementById('form-first_name').value,
          email: doc.getElementById('form-email').value,
          ZIP: doc.getElementById('form-zip_code').value,
          country: countrySelect.value
        };

      return JSON.stringify(petitionFormData);
    }

    function loadSignatureResponse() {
      /**
       * Does the thing after we get a response from the API server
       * */

      if (commitmentStatus.status >= 200 && commitmentStatus.status < 400) {
        handleSigningSuccess()
      } else {
        handleSigningError(commitmentStatus);
      }
    }

    commitmentStatus.open('POST', commitmentForm.dataset.host + '/submission', true);
    commitmentStatus.setRequestHeader('Content-Type', 'application/json');
    commitmentStatus.addEventListener('error', handleSigningError);
    commitmentStatus.addEventListener('load', loadSignatureResponse);
    commitmentStatus.send(compilePayload());
  }

  function addEventListeners() {
    /**
     * Attaches all the listeners all the places
     * */
    countryLabel.addEventListener('click', toggleCountryField);
    countrySelect.addEventListener('change', updateZIPPlaceholder);
    commitmentForm.addEventListener('submit', submitForm);
  }

  function init() {
    addEventListeners();
  }

  init();
};
