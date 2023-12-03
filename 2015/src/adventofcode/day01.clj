(ns adventofcode.day01
  (:require [clojure.string :as str]))
  
;; Start with the input
(def in (-> "resources/day01input" slurp str/trim-newline))

;; Seq of 1s and -1s representing the (s and )s
(def invals (map {\( 1 \) -1} in))

(defn solve
  "..."
  [& args]
  (println

    ;; Part 1
    (reduce + invals)
        
    ;; Part 2
    (+ 1 ;; start counting at 1
       1 ;; if we take away all the initial +ves, the next one is basement
      (count (take-while pos? (reductions + invals))))))
