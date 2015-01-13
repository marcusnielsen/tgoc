var moment = require('moment')

module.exports = function (mnTournamentRepository, mnTournamentStates) {
  var vm = this

  var dateTime = function (dateTime) {
    if(!dateTime) {
      throw new Error('Argument dateTime was not set.')
    }

    return moment(dateTime).format('hh:mm dddd Do MMMM YYYY')
  }

  var timeDifferenceFromNow = function (dateTime) {
    if(!dateTime) {
      throw new Error('Argument dateTime was not set.')
    }

    return moment.duration(moment(dateTime).diff(moment())).humanize();
  }

  var hasStartDatePassed = function (dateTime) {
    if(!dateTime) {
      throw new Error('Argument dateTime was not set.')
    }

    return moment(dateTime).isBefore(moment())
  }

  var tournamentStates = function () {
    return mnTournamentStates
  }

  vm.tournament = null
  vm.dateTime = dateTime
  vm.timeDifferenceFromNow = timeDifferenceFromNow
  vm.hasStartDatePassed = hasStartDatePassed
  vm.tournamentStates = tournamentStates

  ;(function initialize() {
    mnTournamentRepository.tournamentById(vm.mnTournamentId).then(function (data) {
      vm.tournament = data
    }, function (data) {
      alert(data)
    })
  }())
}
