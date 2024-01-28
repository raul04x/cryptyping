// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract CryptoPrediction is Ownable {
    struct Prediction {
        string nameCrypto;
        uint256 valor1;
        uint8 pred1;
        uint256 valor2;
        uint8 pred2;
        int score;
    }

    mapping(address => Prediction[]) public userPredictions;

    // Constructor que establece la dirección del propietario
    constructor() Ownable(msg.sender) {
        // Puedes agregar más lógica de inicialización si es necesario
    }

    // Función para realizar una nueva predicción
    function makePrediction(
        string memory _nameCrypto, 
        uint256 _valor1, 
        uint8 _pred1
    ) public {
        Prediction memory newPrediction = Prediction({
            nameCrypto: _nameCrypto,
            valor1: _valor1,
            pred1: _pred1,
            valor2: 0, // Se inicializa a 0 y se actualizará más tarde
            pred2: 0, // Se inicializa a 0 y se actualizará más tarde
            score: 0  // Se inicializa a 0 y se actualizará más tarde
        });

        userPredictions[msg.sender].push(newPrediction);
    }

    // Función para actualizar los valores de la segunda etapa de una predicción
    function updatePrediction(
        uint _predictionIndex,
        uint256 _valor2, 
        uint8 _pred2
    ) public {
        Prediction storage prediction = userPredictions[msg.sender][_predictionIndex];
        require(prediction.valor1 != 0, "Prediction must be initialized");
        prediction.valor2 = _valor2;
        prediction.pred2 = _pred2;
    }

    // Función para actualizar el puntaje de una predicción
    function updateScore(uint _predictionIndex, int _newScore) public onlyOwner {
        Prediction storage prediction = userPredictions[msg.sender][_predictionIndex];
        require(prediction.valor2 != 0, "Prediction must be updated with second stage values");
        prediction.score = _newScore;
    }

    // Función para obtener una predicción específica de un usuario
    function getPrediction(address user, uint _predictionIndex) public view returns (Prediction memory) {
        require(_predictionIndex < userPredictions[user].length, "Prediction index out of bounds");
        return userPredictions[user][_predictionIndex];
    }

    // Función para obtener todas las predicciones de un usuario
    function getAllPredictions(address user) public view returns (Prediction[] memory) {
        return userPredictions[user];
    }

    // Aquí puedes añadir otras funciones administrativas que solo el dueño pueda ejecutar
}