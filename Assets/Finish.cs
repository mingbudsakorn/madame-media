using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Finish : MonoBehaviour
{
    public string TurnText;
    public int turn;
    // Start is called before the first frame update
    void Start()
    {
        int turn = 1;
        string TurnText = "TURN : " + turn ;
    }

    public void OnClick()
    {
        turn += 1;
        TurnText = "TURN : " + turn;
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
