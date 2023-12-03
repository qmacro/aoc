(ns adventofcode.day08
  (:require [clojure.string :as str]))
  
(defn len-actual
  "Return the number of actual chars (not including
  the wrapping double quotes) in a string of chars."
  [chars]
  (- (count (re-seq #"(\\x[a-f0-9]{2}|\\.|.)" chars)) 2))

(defn len-code
  "Return the number of actual code chars"
  [chars]
  (count (seq chars)))

(defn count-escaped
  [chars]
  (count (re-seq #"(\\|\")" chars)))

(defn solve
  "..."
  [& args]
  (let [in (-> "resources/day08input" slurp str/split-lines)]
    (println

      ;; Part 1
      (reduce +
              (map
                (fn
                  [chars]
                  (- (len-code chars) (len-actual chars))) in))
      ;; Part 2
      (reduce +
              (map
                (fn
                  [chars]
                  (+ (count-escaped chars) 2)) in))
      )))
