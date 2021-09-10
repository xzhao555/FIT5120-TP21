
 var init = { 
     'questions': [        
        {
           'question': 'How often do you have a drink containing alcohol? ',
           'answers': ['Never [Skip to Qs 9-10]', 'Monthly or less ', '2 to 4 times a month ', '2 to 3 times a week ','4 or more times a week '],
		   'correctAnswer': 5
       },       

		{
            'question': 'How many drinks containing alcohol do you have on a typical day when you are drinking? ',
            'answers': ['1 or 2 ', '3 or 4 ', '5 or 6 ', '7, 8, or 9 ','10 or more'],
			  'correctAnswer': 5
       },
       {
           'question': 'How often do you have six or more drinks on one occasion?',
           'answers': [' Never ', 'Less than monthly ', 'Monthly ', 'Weekly ','Daily or almost daily '],
			  'correctAnswer': 5
       },
       {
           'question': 'How often during the last year have you found that you were not able to stop drinking once you had started?',
           'answers': ['Never ', 'Less than monthly', 'Monthly ', 'Weekly ','Daily or almost daily'],
		   'correctAnswer': 5
       },  
       {
           'question': 'How often during the last year have you failed to do what was normally expected from you because of drinking?',
           'answers': ['Never ', 'Less than monthly', 'Monthly ', 'Weekly ','Daily or almost daily'],
			  'correctAnswer': 5
       },

       {
           'question': 'How often during the last year have you needed a first drink in the morning to get yourself going after a heavy drinking session? ',
           'answers': ['Never ', 'Less than monthly', 'Monthly ', 'Weekly ','Daily or almost daily '],
			  'correctAnswer': 5
       },
      {
          'question': 'How often during the last year have you had a feeling of guilt or remorse after drinking?',
          'answers': ['Never ', 'Less than monthly', 'Monthly ', 'Weekly ', 'Daily or almost daily '],
			  'correctAnswer': 5
       },
       {
           'question': 'How often during the last year have you been unable to remember what happened the night before because you had been drinking?',
           'answers': ['Never ', 'Less than monthly', 'Monthly ', 'Weekly ', 'Daily or almost daily '],
			  'correctAnswer': 5
       },
       {
           'question': 'Have you or someone else been injured as a result of your drinking? ',
           'answers': ['No ', 'Yes, but not in the last year ','Yes, during the last year '],
			  'correctAnswer': 3
         },
         {
             'question': 'Has a relative or friend or a doctor or another health worker been concerned about your drinking or suggested you cut down?  ',
             'answers': ['No ', 'Yes, but not in the last year ', 'Yes, during the last year '],
             'correctAnswer': 3
         }

     ],
	  'resultComments' :  
	  {
          perfect: 'Result:Score is less than 8 that could be good.',
          excellent: 'Result:Scores between 8 and 15 are most appropriate for simple advice focused on the reduction of hazardous drinking. ',
          good: 'Result:Scores between 16 and 19 suggest brief counseling and continued monitoring. ',
          average: 'Result:Audit scores of 20 or above clearly warrant further diagnostic evaluation for alcohol dependence. '		
	  }

 };