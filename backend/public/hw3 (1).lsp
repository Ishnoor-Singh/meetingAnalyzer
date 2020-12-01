;
; CS161 Hw3: Sokoban
; 
; *********************
;    READ THIS FIRST
; ********************* 
;
; All functions that you need to modify are marked with 'EXERCISE' in their header comments.
; Do not modify a-star.lsp.
; This file also contains many helper functions. You may call any of them in your functions.
;
; *Warning*: The provided A* code only supports the maximum cost of 4999 for any node.
; That is f(n)=g(n)+h(n) < 5000. So, be careful when you write your heuristic functions.
; Do not make them return anything too large.
;
; For Allegro Common Lisp users: The free version of Allegro puts a limit on memory.
; So, it may crash on some hard sokoban problems and there is no easy fix (unless you buy 
; Allegro). 
; Of course, other versions of Lisp may also crash if the problem is too hard, but the amount
; of memory available will be relatively more relaxed.
; Improving the quality of the heuristic will mitigate this problem, as it will allow A* to
; solve hard problems with fewer node expansions.
; 
; In either case, this limitation should not significantly affect your grade.
; 
; Remember that most functions are not graded on efficiency (only correctness).
; Efficiency can only influence your heuristic performance in the competition (which will
; affect your score).
;  
;


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
; General utility functions
; They are not necessary for this homework.
; Use/modify them for your own convenience.
;

;
; For reloading modified code.
; I found this easier than typing (load "filename") every time. 
;
(defun reload()
  (load "hw3.lsp")
  )

;
; For loading a-star.lsp.
;
(defun load-a-star()
  (load "a-star.lsp"))

;
; Reloads hw3.lsp and a-star.lsp
;
(defun reload-all()
  (reload)
  (load-a-star)
  )

;
; A shortcut function.
; goal-test and next-states stay the same throughout the assignment.
; So, you can just call (sokoban <init-state> #'<heuristic-name>).
; 
;
(defun sokoban (s)
  (a* s #'goal-test #'next-states #'h0)
  )

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
; end general utility functions
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
; We now begin actual Sokoban code
;

; Define some global variables
(setq blank 0)
(setq wall 1)
(setq box 2)
(setq keeper 3)
(setq star 4)
(setq boxstar 5)
(setq keeperstar 6)

; Some helper functions for checking the content of a square
(defun isBlank (v)
  (= v blank)
  )

(defun isWall (v)
  (= v wall)
  )

(defun isBox (v)
  (= v box)
  )

(defun isKeeper (v)
  (= v keeper)
  )

(defun isStar (v)
  (= v star)
  )

(defun isBoxStar (v)
  (= v boxstar)
  )

(defun isKeeperStar (v)
  (= v keeperstar)
  )

;
; Helper function of getKeeperPosition
;
(defun getKeeperColumn (r col)
  (cond ((null r) nil)
	(t (if (or (isKeeper (car r)) (isKeeperStar (car r)))
	       col
	     (getKeeperColumn (cdr r) (+ col 1))
	     );end if
	   );end t
	);end cond
  )

;
; getKeeperPosition (s firstRow)
; Returns a list indicating the position of the keeper (c r).
; 
; Assumes that the keeper is in row >= firstRow.
; The top row is the zeroth row.
; The first (right) column is the zeroth column.
;
(defun getKeeperPosition (s row)
  (cond ((null s) nil)
	(t (let ((x (getKeeperColumn (car s) 0)))
	     (if x
		 ;keeper is in this row
		 (list x row)
		 ;otherwise move on
		 (getKeeperPosition (cdr s) (+ row 1))
		 );end if
	       );end let
	 );end t
	);end cond
  );end defun

;
; cleanUpList (l)
; returns l with any NIL element removed.
; For example, if l is '(1 2 NIL 3 NIL), returns '(1 2 3).
;
(defun cleanUpList (L)
  (cond ((null L) nil)
	(t (let ((cur (car L))
		 (res (cleanUpList (cdr L)))
		 )
	     (if cur 
		 (cons cur res)
		  res
		 )
	     );end let
	   );end t
	);end cond
  );end 


(defun is-goal-row (row)
	(cond 
		((null row) t); if empty
		(t (if (isBox (car row))
				nil; then
				(is-goal-row (cdr row)); else
			); end if
		)
	); end cond
)

; EXERCISE: Modify this function to return true (t)
; if and only if s is a goal state of a Sokoban game.
; (no box is on a non-goal square)
;
; Currently, it always returns NIL. If A* is called with
; this function as the goal testing function, A* will never
; terminate until the whole search space is exhausted.
;
(defun goal-test (s)
	;; (print "goal test")
  (cond ((null s) t)
	(t (if (is-goal-row (car s))
			(goal-test (cdr s)); then
			nil; else
		); end if
	)
  	); end cond
  );end defun

; returns the new value we want once the keeper has moved away
; num is the prev values of the cell with keeper
(defun keeper-move-from (num)
	(cond
		((isKeeper num) blank)
		((isKeeperStar num) star)
	)
)
; returns the new value we want once the keeper has moved into it
; num is the prev values of the cell with keeper now
(defun keeper-move-to (num)
	(cond
		((isBlank num) keeper)
		((isStar num) keeperstar)
	)
)
; returns the new value we want once the box has moved into it
; num is the prev values of the cell with box now
(defun box-move-to (num)
	(cond 
		((isBlank num) box)
		((isStar num) boxstar)
	)
)
; returns the new value we want once the box has moved away
; num is the prev values of the cell with box
(defun box-move-from (num)
	(cond 
		((isBox num) blank)
		((isBoxStar num) star)
	)
)

; returns the value of the cell at col, row in the state
; returns nil if col or row is less than 0
(defun whats-at (s col row)
	(cond
		((or (< col 0) (< row 0)) nil)
		(t (nth col (nth row s)))
	)
)
; updates the value of the cell at col, row to be item
(defun update-cell (s col row item)
	(cond
		((or (null s) (null (car s))) nil); if state of first row is null
		((and (= col 0) (= row 0)) ; if we have reached our cell
			(cons 
				(cons item (cdr (car s)))
				(cdr s)
			)
		)
		((> row 0) (cons; recurse over rows
						(car s)
						(update-cell (cdr s) col (- row 1) item)
					))
		((> col 0) (let* (; recurse within the same row
							(newS (cons 
									(cdr (car s))
									(cdr s)
								)
							)
							(rec (update-cell newS (- col 1) row item))
						)
						(cons 
							(cons
								(car (car s))
								(car rec)
							)
							(cdr rec)
						)
					)
		)
	)
)
; moves keeper from col, row to n-col, n-row and returns new state s'
(defun move-keeper-from-to (s col row n-col n-row)
	(let* (
		(from (whats-at s col row)); contents of keeper's previous location
		(to (whats-at s n-col n-row)); contents of keeper's new cell
		(intermediate (update-cell s col row (keeper-move-from from))); move keeper to next cell
		(final (update-cell intermediate n-col n-row (keeper-move-to to))); empty keeper's previous cell
	)
	final
	)
)
; moves keeper and box, takes in row, col of keeps b-row and b-col of the box and direction of the movement
(defun move-keeper-and-box-from-to (s col row b-col b-row direction)
	(let* (
		(box-to (calc-next b-col b-row direction)); get the location we are moving cell into
		(n-col (car box-to))
		(n-row (cadr box-to))
		(to (whats-at s n-col n-row)); value of the cell we are moving box into
		(from (whats-at s b-col b-row)); value of the cell we are moving box from
	)
		(cond
			((null to) nil); if to is not valid
			((or (isBox to) (isWall to)) nil)
			((isBoxStar to) nil)
			((or (isStar to) (isBlank to))
				(let* (
					(i1 (update-cell s n-col n-row (box-move-to to))); move the box
					(i2 (update-cell i1 b-col b-row (box-move-from from))); clear the box's prev locations
					(i3 (update-cell i2 b-col b-row (keeper-move-to (whats-at i2 b-col b-row)))); move the keeper to theat location
					(i4 (update-cell i3 col row (keeper-move-from (whats-at i3 col row)))); clear the keeper's previous location
				)
				i4
				)
			)
		)
	)
)

; calculates the next cell based on current col, row and a direction
(defun calc-next (col row direction)
	(cond; switch statement on direction
		((equal direction 'LEFT) (list (- col 1) row))
		((equal direction 'RIGHT) (list (+ col 1) row))
		((equal direction 'DOWN) (list col (+ row 1)))
		((equal direction 'UP) (list col (- row 1)))
	)
)

; takes in a state s and a direction and then calclucates next stae, returns it if valid
; else returns nil
(defun try-move (s direction)
	(let* (
			(keeper (getKeeperPosition s 0)); get the keeper's current location
			(col (car keeper))
			(row (cadr keeper))
			(next (calc-next col row direction)); calculate the cell we are about to move to
			(n-col (car next))
			(n-row (cadr next))
			(in-way (whats-at s n-col n-row)); the value of the cell in the way of the move
		); initiate keeper position and next
		(cond
			((null in-way) nil)
			((isWall in-way) nil)
			((or (isBlank in-way) (isStar in-way)) (move-keeper-from-to s col row n-col n-row))
			((or (isBoxStar in-way) (isBox in-way)) (move-keeper-and-box-from-to s col row n-col n-row direction))
		)
	); end let
)

; EXERCISE: Modify this function to return the list of 
; sucessor states of s.
;
; This is the top-level next-states (successor) function.
; Some skeleton code is provided below.
; You may delete them totally, depending on your approach.
; 
; If you want to use it, you will need to set 'result' to be 
; the set of states after moving the keeper in each of the 4 directions.
; A pseudo-code for this is:
; 
; ...
; (result (list (try-move s UP) (try-move s DOWN) (try-move s LEFT) (try-move s RIGHT)))
; ...
; 
; You will need to define the function try-move and decide how to represent UP,DOWN,LEFT,RIGHT.
; Any NIL result returned from try-move can be removed by cleanUpList.
;
;
(defun next-states (s)
  (let* ((pos (getKeeperPosition s 0))
	 (x (car pos))
	 (y (cadr pos))
	 ;x and y are now the coordinate of the keeper in s.
	;;  (result nil)
	 (result (list (try-move s 'UP) (try-move s 'DOWN) (try-move s 'LEFT) (try-move s 'RIGHT)))
	;;  (result (list (try-move s 'UP) (try-move s 'DOWN) (try-move s 'LEFT) (try-move s 'RIGHT)))
	 )
    (cleanUpList result);end
   );end let
  );

; EXERCISE: Modify this function to compute the trivial 
; admissible heuristic.
;
(defun h0 (s)
	0
  )

; counts number of boxes in a row by recursively checking each element
(defun count-boxes-in-row (row)
	(cond
		((null row) 0)
		((isBox (car row)) (+ 1 (count-boxes-in-row (cdr row))))
		(t (count-boxes-in-row (cdr row)))
	)
)
; EXERCISE: Modify this function to compute the 
; number of misplaced boxes in s.
; uses count-boxes-in-row to loop through every row and sum the number of boxes
; i believe its a valid hueristic because it will atleast it one step per box to move them into 
; the goals, so number of boxes is always an optimistic estimate of the cost
(defun h1 (s)
	(cond
		((null s) 0)
		(t (+ (count-boxes-in-row (car s)) (h1 (cdr s))))
	)
  )

; returns a list of the positions of all the boxes ina row 
; inputs are the curRow(holds row) and col, row which are the col and row identifiers
(defun find-boxes-in-row (curRow col row)
	(cond
		((null curRow) nil)
		((isBox (car curRow)) (cons (list col row) (find-boxes-in-row (cdr curRow) (+ 1 col) row)))
		(t (find-boxes-in-row (cdr curRow) (+ 1 col) row))
	)
)
; uses find-boxes-in-row to go through all the rows and return an array of all
; the boxes in the state s.
; it takes state s and row number row as inputs
(defun find-boxes (S row)
	(cond
		((null s) nil)
		(t (append (find-boxes-in-row (car s) 0 row) (find-boxes (cdr s) (+ row 1))))
	)
)
; returns a list of the positions of all the stars ina row 
; inputs are the curRow(holds row) and col, row which are the col and row identifiers
(defun find-stars-in-row (curRow col row)
	(cond
		((null curRow) nil)
		((isStar (car curRow)) (cons (list col row) (find-boxes-in-row (cdr curRow) (+ 1 col) row)))
		(t (find-boxes-in-row (cdr curRow) (+ 1 col) row))
	)
)
; uses find-stars-in-row to go through all the rows and return an array of all
; the stars in the state s.
; it takes state s and row number row as inputs
(defun find-stars (S row)
	(cond
		((null s) nil)
		(t (append (find-boxes-in-row (car s) 0 row) (find-boxes (cdr s) (+ row 1))))
	)
)

; finds the absolute value of a number num
(defun absolute (num)
	(if (< num 0)
		(* num -1)
		num
	)
)

; finds the min-grid distance
; for start: x1, y1 and end: x2 , y2
; the min-grid-dist is defined as abs(x1-x2) + abs(y1-y2)
(defun min-grid-dist(start end)
	(let*
		(
			(x1 (car start))
			(x2 (car end))
			(y1 (cadr start))
			(y2 (cadr start))
		)
		(+
			(absolute (- x1 x2))
			(absolute (- y1 y2))
		)
	)
)

; takes in a start point and a list of targets and find the distance from 
; start to the closest target
(defun dist-to-closest (start targets)
	(cond
		((null (cdr targets)) (min-grid-dist start (car targets)))
		(t 
			(let* 
				(
					(remaining (dist-to-closest start (cdr targets)))
					(cur (min-grid-dist start (car targets)))
				)
				(if (< remaining cur)
					remaining; if the minimum is in the cdr of the targets
					cur; else
				)
			)
		)
	)
)

; given a set of boxes and stars it finds the sum of the dists from
; each box to its closest star
(defun sum-dist-to-stars (boxes stars)
	(cond 
		((null boxes) 0); if emptym return 0
		(t (+; add the current distanc e+ that of the rest
				(dist-to-closest (car boxes) stars)
				(min-dist-box-star (cdr boxes) stars)
			)
		)
	)
)

; EXERCISE: Change the name of this function to h<UID> where
; <UID> is your actual student ID number. Then, modify this 
; function to compute an admissible heuristic value of s. 
; 
; This function will be entered in the competition.
; Objective: make A* solve problems as fast as possible.
; The Lisp 'time' function can be used to measure the 
; running time of a function call.
;

; thoughts for hueristic: 
; i want to calculate the distance to move to the nearest box and multiply that to the number of boxes
; and add that to the distance needed to move to the closest goal for 
; each of the boxes
; when i say distance it will be the smallest grid distance ignoring any
; walls/obstructions
; so the dist b/w (x1, y1) and (x2, y2) will be abs(x1-x2) + abs (y1-y2)
; this is admissable since the distance is the least possible distance in each case
; and it works even if the momentthe keeper gets a box to its nearest goal, the
; keeper is already at the next box. Thus, it is always more optimistic than the actual distance
(defun h205097699 (s)
	(let*
		(
			(boxes (find-boxes s 0))
			(stars (find-stars s 0))
			(pos (getKeeperPosition s 0))
			(numBoxes (h1 s))
		)
		(if (= numBoxes 0)
			0; if no boxes, we're at goal state
			(+
				(* (dist-to-closest pos boxes) numBoxes)
				(sum-dist-to-stars boxes stars)
			); cost that we talked about for the hueristic
		)
	)
)

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

#|
 | Some predefined problems.
 | Each problem can be visualized by calling (printstate <problem>). For example, (printstate p1).
 | Problems are roughly ordered by their difficulties.
 | For most problems, we also privide 2 additional number per problem:
 |    1) # of nodes expanded by A* using our next-states and h0 heuristic.
 |    2) the depth of the optimal solution.
 | These numbers are located at the comments of the problems. For example, the first problem below 
 | was solved by 80 nodes expansion of A* and its optimal solution depth is 7.
 | 
 | Your implementation may not result in the same number of nodes expanded, but it should probably
 | give something in the same ballpark. As for the solution depth, any admissible heuristic must 
 | make A* return an optimal solution. So, the depths of the optimal solutions provided could be used
 | for checking whether your heuristic is admissible.
 |
 | Warning: some problems toward the end are quite hard and could be impossible to solve without a good heuristic!
 | 
 |#

;(80,7)
(setq p1 '((1 1 1 1 1 1)
	   (1 0 3 0 0 1)
	   (1 0 2 0 0 1)
	   (1 1 0 1 1 1)
	   (1 0 0 0 0 1)
	   (1 0 0 0 4 1)
	   (1 1 1 1 1 1)))

;(110,10)
(setq p2 '((1 1 1 1 1 1 1)
	   (1 0 0 0 0 0 1) 
	   (1 0 0 0 0 0 1) 
	   (1 0 0 2 1 4 1) 
	   (1 3 0 0 1 0 1)
	   (1 1 1 1 1 1 1)))

;(211,12)
(setq p3 '((1 1 1 1 1 1 1 1 1)
	   (1 0 0 0 1 0 0 0 1)
	   (1 0 0 0 2 0 3 4 1)
	   (1 0 0 0 1 0 0 0 1)
	   (1 0 0 0 1 0 0 0 1)
	   (1 1 1 1 1 1 1 1 1)))

;(300,13)
(setq p4 '((1 1 1 1 1 1 1)
	   (0 0 0 0 0 1 4)
	   (0 0 0 0 0 0 0)
	   (0 0 1 1 1 0 0)
	   (0 0 1 0 0 0 0)
	   (0 2 1 0 0 0 0)
	   (0 3 1 0 0 0 0)))

;(551,10)
(setq p5 '((1 1 1 1 1 1)
	   (1 1 0 0 1 1)
	   (1 0 0 0 0 1)
	   (1 4 2 2 4 1)
	   (1 0 0 0 0 1)
	   (1 1 3 1 1 1)
	   (1 1 1 1 1 1)))

;(722,12)
(setq p6 '((1 1 1 1 1 1 1 1)
	   (1 0 0 0 0 0 4 1)
	   (1 0 0 0 2 2 3 1)
	   (1 0 0 1 0 0 4 1)
	   (1 1 1 1 1 1 1 1)))

;(1738,50)
(setq p7 '((1 1 1 1 1 1 1 1 1 1)
	   (0 0 1 1 1 1 0 0 0 3)
	   (0 0 0 0 0 1 0 0 0 0)
	   (0 0 0 0 0 1 0 0 1 0)
	   (0 0 1 0 0 1 0 0 1 0)
	   (0 2 1 0 0 0 0 0 1 0)
	   (0 0 1 0 0 0 0 0 1 4)))

;(1763,22)
(setq p8 '((1 1 1 1 1 1)
	   (1 4 0 0 4 1)
	   (1 0 2 2 0 1)
	   (1 2 0 1 0 1)
	   (1 3 0 0 4 1)
	   (1 1 1 1 1 1)))

;(1806,41)
(setq p9 '((1 1 1 1 1 1 1 1 1) 
	   (1 1 1 0 0 1 1 1 1) 
	   (1 0 0 0 0 0 2 0 1) 
	   (1 0 1 0 0 1 2 0 1) 
	   (1 0 4 0 4 1 3 0 1) 
	   (1 1 1 1 1 1 1 1 1)))

;(10082,51)
(setq p10 '((1 1 1 1 1 0 0)
	    (1 0 0 0 1 1 0)
	    (1 3 2 0 0 1 1)
	    (1 1 0 2 0 0 1)
	    (0 1 1 0 2 0 1)
	    (0 0 1 1 0 0 1)
	    (0 0 0 1 1 4 1)
	    (0 0 0 0 1 4 1)
	    (0 0 0 0 1 4 1)
	    (0 0 0 0 1 1 1)))

;(16517,48)
(setq p11 '((1 1 1 1 1 1 1)
	    (1 4 0 0 0 4 1)
	    (1 0 2 2 1 0 1)
	    (1 0 2 0 1 3 1)
	    (1 1 2 0 1 0 1)
	    (1 4 0 0 4 0 1)
	    (1 1 1 1 1 1 1)))

;(22035,38)
(setq p12 '((0 0 0 0 1 1 1 1 1 0 0 0)
	    (1 1 1 1 1 0 0 0 1 1 1 1)
	    (1 0 0 0 2 0 0 0 0 0 0 1)
	    (1 3 0 0 0 0 0 0 0 0 0 1)
	    (1 0 0 0 2 1 1 1 0 0 0 1)
	    (1 0 0 0 0 1 0 1 4 0 4 1)
	    (1 1 1 1 1 1 0 1 1 1 1 1)))

;(26905,28)
(setq p13 '((1 1 1 1 1 1 1 1 1 1)
	    (1 4 0 0 0 0 0 2 0 1)
	    (1 0 2 0 0 0 0 0 4 1)
	    (1 0 3 0 0 0 0 0 2 1)
	    (1 0 0 0 0 0 0 0 0 1)
	    (1 0 0 0 0 0 0 0 4 1)
	    (1 1 1 1 1 1 1 1 1 1)))

;(41715,53)
(setq p14 '((0 0 1 0 0 0 0)
	    (0 2 1 4 0 0 0)
	    (0 2 0 4 0 0 0)
	    (3 2 1 1 1 0 0)
	    (0 0 1 4 0 0 0)))

;(48695,44)
(setq p15 '((1 1 1 1 1 1 1)
	    (1 0 0 0 0 0 1)
	    (1 0 0 2 2 0 1)
	    (1 0 2 0 2 3 1)
	    (1 4 4 1 1 1 1)
	    (1 4 4 1 0 0 0)
	    (1 1 1 1 0 0 0)
	    ))

;(91344,111)
(setq p16 '((1 1 1 1 1 0 0 0)
	    (1 0 0 0 1 0 0 0)
	    (1 2 1 0 1 1 1 1)
	    (1 4 0 0 0 0 0 1)
	    (1 0 0 5 0 5 0 1)
	    (1 0 5 0 1 0 1 1)
	    (1 1 1 0 3 0 1 0)
	    (0 0 1 1 1 1 1 0)))

;(3301278,76)
(setq p17 '((1 1 1 1 1 1 1 1 1 1)
	    (1 3 0 0 1 0 0 0 4 1)
	    (1 0 2 0 2 0 0 4 4 1)
	    (1 0 2 2 2 1 1 4 4 1)
	    (1 0 0 0 0 1 1 4 4 1)
	    (1 1 1 1 1 1 0 0 0 0)))

;(??,25)
(setq p18 '((0 0 0 0 1 0 0 0 0 0 0 1 0 0 0 0)
	    (0 0 0 0 1 0 0 0 0 0 0 1 0 0 0 0)
	    (1 1 1 1 1 0 0 0 0 0 0 1 1 1 1 1)
	    (0 0 0 0 0 1 0 0 0 0 1 0 0 0 0 0)
	    (0 0 0 0 0 0 1 0 0 1 0 0 0 0 0 0)
	    (0 0 0 0 0 0 0 0 3 0 0 0 0 0 0 0)
	    (0 0 0 0 0 0 1 0 0 1 0 0 0 0 0 0)
	    (0 0 0 0 0 1 0 0 0 0 1 0 0 0 0 0)
	    (1 1 1 1 1 0 0 0 0 0 0 1 1 1 1 1)
	    (0 0 0 0 1 0 0 0 0 0 0 1 0 0 0 0)
	    (0 0 0 0 1 0 0 0 0 0 0 1 0 0 0 0)
	    (0 0 0 0 1 0 0 0 0 0 4 1 0 0 0 0)
	    (0 0 0 0 1 0 2 0 0 0 0 1 0 0 0 0)	    
	    (0 0 0 0 1 0 2 0 0 0 4 1 0 0 0 0)
	    ))
;(??,21)
(setq p19 '((0 0 0 1 0 0 0 0 1 0 0 0)
	    (0 0 0 1 0 0 0 0 1 0 0 0)
	    (0 0 0 1 0 0 0 0 1 0 0 0)
	    (1 1 1 1 0 0 0 0 1 1 1 1)
	    (0 0 0 0 1 0 0 1 0 0 0 0)
	    (0 0 0 0 0 0 3 0 0 0 2 0)
	    (0 0 0 0 1 0 0 1 0 0 0 4)
	    (1 1 1 1 0 0 0 0 1 1 1 1)
	    (0 0 0 1 0 0 0 0 1 0 0 0)
	    (0 0 0 1 0 0 0 0 1 0 0 0)
	    (0 0 0 1 0 2 0 4 1 0 0 0)))

;(??,??)
(setq p20 '((0 0 0 1 1 1 1 0 0)
	    (1 1 1 1 0 0 1 1 0)
	    (1 0 0 0 2 0 0 1 0)
	    (1 0 0 5 5 5 0 1 0)
	    (1 0 0 4 0 4 0 1 1)
	    (1 1 0 5 0 5 0 0 1)
	    (0 1 1 5 5 5 0 0 1)
	    (0 0 1 0 2 0 1 1 1)
	    (0 0 1 0 3 0 1 0 0)
	    (0 0 1 1 1 1 1 0 0)))

;(??,??)
(setq p21 '((0 0 1 1 1 1 1 1 1 0)
	    (1 1 1 0 0 1 1 1 1 0)
	    (1 0 0 2 0 0 0 1 1 0)
	    (1 3 2 0 2 0 0 0 1 0)
	    (1 1 0 2 0 2 0 0 1 0)
	    (0 1 1 0 2 0 2 0 1 0)
	    (0 0 1 1 0 2 0 0 1 0)
	    (0 0 0 1 1 1 1 0 1 0)
	    (0 0 0 0 1 4 1 0 0 1)
	    (0 0 0 0 1 4 4 4 0 1)
	    (0 0 0 0 1 0 1 4 0 1)
	    (0 0 0 0 1 4 4 4 0 1)
	    (0 0 0 0 1 1 1 1 1 1)))

;(??,??)
(setq p22 '((0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0)
	    (0 0 0 0 1 0 0 0 1 0 0 0 0 0 0 0 0 0 0)
	    (0 0 0 0 1 2 0 0 1 0 0 0 0 0 0 0 0 0 0)
	    (0 0 1 1 1 0 0 2 1 1 0 0 0 0 0 0 0 0 0)
	    (0 0 1 0 0 2 0 2 0 1 0 0 0 0 0 0 0 0 0)
	    (1 1 1 0 1 0 1 1 0 1 0 0 0 1 1 1 1 1 1)
	    (1 0 0 0 1 0 1 1 0 1 1 1 1 1 0 0 4 4 1)
	    (1 0 2 0 0 2 0 0 0 0 0 0 0 0 0 0 4 4 1)
	    (1 1 1 1 1 0 1 1 1 0 1 3 1 1 0 0 4 4 1)
	    (0 0 0 0 1 0 0 0 0 0 1 1 1 1 1 1 1 1 1)
	    (0 0 0 0 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0)))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

#|
 | Utility functions for printing states and moves.
 | You do not need to understand any of the functions below this point.
 |#

;
; Helper function of prettyMoves
; from s1 --> s2
;
(defun detectDiff (s1 s2)
  (let* ((k1 (getKeeperPosition s1 0))
	 (k2 (getKeeperPosition s2 0))
	 (deltaX (- (car k2) (car k1)))
	 (deltaY (- (cadr k2) (cadr k1)))
	 )
    (cond ((= deltaX 0) (if (> deltaY 0) 'DOWN 'UP))
	  (t (if (> deltaX 0) 'RIGHT 'LEFT))
	  );end cond
    );end let
  );end defun

;
; Translates a list of states into a list of moves.
; Usage: (prettyMoves (a* <problem> #'goal-test #'next-states #'heuristic))
;
(defun prettyMoves (m)
  (cond ((null m) nil)
	((= 1 (length m)) (list 'END))
	(t (cons (detectDiff (car m) (cadr m)) (prettyMoves (cdr m))))
	);end cond
  );

;
; Print the content of the square to stdout.
;
(defun printSquare (s)
  (cond ((= s blank) (format t " "))
	((= s wall) (format t "#"))
	((= s box) (format t "$"))
	((= s keeper) (format t "@"))
	((= s star) (format t "."))
	((= s boxstar) (format t "*"))
	((= s keeperstar) (format t "+"))
	(t (format t "|"))
	);end cond
  )

;
; Print a row
;
(defun printRow (r)
  (dolist (cur r)
    (printSquare cur)    
    )
  );

;
; Print a state
;
(defun printState (s)
  (progn    
    (dolist (cur s)
      (printRow cur)
      (format t "~%")
      )
    );end progn
  )

;
; Print a list of states with delay.
;
(defun printStates (sl delay)
  (dolist (cur sl)
    (printState cur)
    (sleep delay)
    );end dolist
  );end defun