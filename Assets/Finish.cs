using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using UnityEngine;
using UnityEngine.UI;

public class Finish : MonoBehaviour
{
    public TextMesh turnText;
    public int turn;
    // Start is called before the first frame update
    void Start()
    {
        turn = 1;
        turnText.text = "TURN : " + turn;
    }

    public void OnClick()
    {
        turn += 1;
        turnText.text = "TURN : " + turn;
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
